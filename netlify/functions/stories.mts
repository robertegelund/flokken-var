import type { Config, Context } from "@netlify/functions";
import { randomUUID } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { stories } from "../../db/schema.js";

// Public projection: excludes createdBy, which holds a server-generated
// delete secret (see below) and must never be exposed to readers.
const offentligeFelter = {
  id: stories.id,
  title: stories.title,
  content: stories.content,
  categories: stories.categories,
  imageUrl: stories.imageUrl,
  imageDescription: stories.imageDescription,
  publishedAt: stories.publishedAt,
};

export default async (req: Request, context: Context) => {
  const id = context.params.id;

  if (req.method === "GET") {
    if (id) {
      const [story] = await db.select(offentligeFelter).from(stories).where(eq(stories.id, Number(id)));
      if (!story) {
        return new Response("Not found", { status: 404 });
      }
      return Response.json(story);
    }

    const allStories = await db.select(offentligeFelter).from(stories).orderBy(desc(stories.publishedAt));
    return Response.json(allStories);
  }

  if (req.method === "POST") {
    const body = await req.json();
    const { title, content, categories, imageUrl, imageDescription, publishedAt } = body;

    if (!title || !content || !Array.isArray(categories) || categories.length === 0) {
      return new Response("title, content and categories are required", { status: 400 });
    }

    // Optional: lets migrated/imported stories keep their original publish
    // date instead of defaulting to now(). Ignored if missing or invalid.
    const parsedPublishedAt = publishedAt ? new Date(publishedAt) : null;
    const gyldigPublishedAt = parsedPublishedAt && !Number.isNaN(parsedPublishedAt.getTime()) ? parsedPublishedAt : undefined;

    // Generated server-side, never trusted from the client: this is the only
    // credential that authorizes deleting the story later (see DELETE below).
    const slettenokkel = randomUUID();

    const [story] = await db
      .insert(stories)
      .values({
        title,
        content,
        categories,
        imageUrl: imageUrl || null,
        imageDescription: imageDescription || null,
        createdBy: slettenokkel,
        ...(gyldigPublishedAt ? { publishedAt: gyldigPublishedAt } : {}),
      })
      .returning(offentligeFelter);

    return Response.json({ ...story, slettenokkel }, { status: 201 });
  }

  if (req.method === "DELETE") {
    if (!id) {
      return new Response("Story id is required", { status: 400 });
    }

    const slettenokkel = req.headers.get("x-slettenokkel");
    if (!slettenokkel) {
      return new Response("Missing delete key", { status: 401 });
    }

    const [story] = await db.select({ createdBy: stories.createdBy }).from(stories).where(eq(stories.id, Number(id)));
    if (!story) {
      return new Response("Not found", { status: 404 });
    }
    if (story.createdBy !== slettenokkel) {
      return new Response("Forbidden", { status: 403 });
    }

    await db.delete(stories).where(eq(stories.id, Number(id)));
    return new Response(null, { status: 204 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/stories", "/api/stories/:id"],
};
