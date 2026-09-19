ALTER TABLE "about_me" ADD COLUMN "hr_summary" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "logo_url" text;--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_title_unique" UNIQUE("title");--> statement-breakpoint
ALTER TABLE "skills" ADD CONSTRAINT "skills_title_unique" UNIQUE("title");