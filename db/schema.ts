import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const stories = pgTable("stories", {
  id: serial().primaryKey(),
  title: text().notNull(),
  content: text().notNull(),
  categories: text().array().notNull(),
  imageUrl: text("image_url"),
  imageDescription: text("image_description"),
  createdBy: text("created_by"),
  publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow().notNull(),
});
