import type { Config, Context } from "@netlify/functions";
import { desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { stories } from "../../db/schema.js";

export default async (req: Request, context: Context) => {
  const id = context.params.id;

  if (req.method === "GET") {
    if (id) {
      const [story] = await db.select().from(stories).where(eq(stories.id, Number(id)));
      if (!story) {
        return new Response("Not found", { status: 404 });
      }
      return Response.json(story);
    }

    const allStories = await db.select().from(stories).orderBy(desc(stories.publishedAt));
    return Response.json(allStories);
  }

  if (req.method === "POST") {
    const body = await req.json();
    const { title, content, categories, imageUrl, imageDescription, createdBy } = body;

    if (!title || !content || !Array.isArray(categories) || categories.length === 0) {
      return new Response("title, content and categories are required", { status: 400 });
    }

    const [story] = await db
      .insert(stories)
      .values({
        title,
        content,
        categories,
        imageUrl: imageUrl || null,
        imageDescription: imageDescription || null,
        createdBy: createdBy || null,
      })
      .returning();

    return Response.json(story, { status: 201 });
  }

  if (req.method === "DELETE") {
    if (!id) {
      return new Response("Story id is required", { status: 400 });
    }
    await db.delete(stories).where(eq(stories.id, Number(id)));
    return new Response(null, { status: 204 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/stories", "/api/stories/:id"],
};
