import type { Config, Context } from "@netlify/functions";
import { asc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { flokkmedlemmer } from "../../db/schema.js";

// Admin-curated content, not user-submitted like stories - no delete
// endpoint here on purpose, and creation isn't gated behind any per-item
// secret the way story deletion is.
export default async (req: Request, context: Context) => {
  const id = context.params.id;

  if (req.method === "GET") {
    if (id) {
      const [medlem] = await db.select().from(flokkmedlemmer).where(eq(flokkmedlemmer.id, Number(id)));
      if (!medlem) {
        return new Response("Not found", { status: 404 });
      }
      return Response.json(medlem);
    }

    const kategori = new URL(req.url).searchParams.get("kategori");
    const alleMedlemmer = kategori
      ? await db.select().from(flokkmedlemmer).where(eq(flokkmedlemmer.kategori, kategori)).orderBy(asc(flokkmedlemmer.id))
      : await db.select().from(flokkmedlemmer).orderBy(asc(flokkmedlemmer.id));

    return Response.json(alleMedlemmer);
  }

  if (req.method === "POST") {
    const body = await req.json();
    const { fornavn, etternavn, tittel, beskrivelse, bildeUrl, kategori } = body;

    if (!fornavn || !tittel || !beskrivelse || !kategori) {
      return new Response("fornavn, tittel, beskrivelse and kategori are required", { status: 400 });
    }
    if (kategori !== "fagfolk" && kategori !== "influensere") {
      return new Response("kategori must be 'fagfolk' or 'influensere'", { status: 400 });
    }

    const [medlem] = await db
      .insert(flokkmedlemmer)
      .values({
        fornavn,
        etternavn: etternavn || "",
        tittel,
        beskrivelse,
        bildeUrl: bildeUrl || null,
        kategori,
      })
      .returning();

    return Response.json(medlem, { status: 201 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/flokkmedlemmer", "/api/flokkmedlemmer/:id"],
};
