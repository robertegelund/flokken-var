CREATE TABLE "flokkmedlemmer" (
	"id" serial PRIMARY KEY,
	"fornavn" text NOT NULL,
	"etternavn" text DEFAULT '',
	"tittel" text NOT NULL,
	"beskrivelse" text NOT NULL,
	"bilde_url" text,
	"kategori" text NOT NULL
);
