CREATE TABLE IF NOT EXISTS "widget_visibility" (
	"id" serial PRIMARY KEY NOT NULL,
	"widget_id" integer NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL
);
