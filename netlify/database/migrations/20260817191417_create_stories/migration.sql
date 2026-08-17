CREATE TABLE "stories" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"categories" text[] NOT NULL,
	"image_url" text,
	"image_description" text,
	"created_by" text,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL
);
