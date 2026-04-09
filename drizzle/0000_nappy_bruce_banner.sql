CREATE TABLE "about_me" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"rust_code" text DEFAULT '' NOT NULL,
	"ts_code" text DEFAULT '' NOT NULL,
	"nest_code" text DEFAULT '' NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"icon_url" text NOT NULL,
	"link" text NOT NULL,
	"handle" text,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "custom_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"github_url" text,
	"homepage_url" text,
	"topics" text[],
	"language" text,
	"image_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "github_orgs" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_login" text NOT NULL,
	"display_name" text NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	CONSTRAINT "github_orgs_org_login_unique" UNIQUE("org_login")
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"github_url" text NOT NULL,
	"website_url" text,
	"role_badge" text,
	"version" text,
	"language_name" text,
	"language_pct" integer,
	"releases_count" integer,
	"license" text,
	"status" text,
	"tags" text[],
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "organizations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "project_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"repo_name" text NOT NULL,
	"image_url" text NOT NULL,
	CONSTRAINT "project_images_repo_name_unique" UNIQUE("repo_name")
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"logo_url" text NOT NULL,
	"title" text NOT NULL,
	"first_tried" date NOT NULL,
	"category" text NOT NULL,
	"description" text NOT NULL,
	"docs_url" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
