import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const organizations = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  logoUrl: text('logo_url'),
  description: text('description').notNull().default(''),
  githubUrl: text('github_url').notNull(),
  websiteUrl: text('website_url'),
  roleBadge: text('role_badge'),
  version: text('version'),
  languageName: text('language_name'),
  languagePct: integer('language_pct'),
  releasesCount: integer('releases_count'),
  license: text('license'),
  status: text('status'),
  tags: text('tags').array(),
  sortOrder: integer('sort_order').notNull().default(0),
});

export type Organization = typeof organizations.$inferSelect;
