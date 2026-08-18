import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const stories = pgTable("stories", {
  id: serial().primaryKey(),
  title: text().notNull(),
  content: text().notNull(),
  categories: text().array().notNull(),
  imageUrl: text("image_url"),
  imageDescription: text("image_description"),
  // Server-generated secret that authorizes deleting this story. Returned
  // only once, to the creator, right after the story is created - never
  // included in public reads (see netlify/functions/stories.mts).
  createdBy: text("created_by"),
  publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow().notNull(),
});

// Admin-curated content (professionals/influencers shown on /fagfolk) -
// not user-submitted, so display order follows insertion (id) rather than
// a timestamp, matching how the old static flokken.json was ordered.
export const flokkmedlemmer = pgTable("flokkmedlemmer", {
  id: serial().primaryKey(),
  fornavn: text().notNull(),
  etternavn: text().default(""),
  tittel: text().notNull(),
  beskrivelse: text().notNull(),
  bildeUrl: text("bilde_url"),
  kategori: text().notNull(),
});
