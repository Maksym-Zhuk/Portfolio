import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const customProjects = pgTable('custom_projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull().default(''),
  githubUrl: text('github_url'),
  homepageUrl: text('homepage_url'),
  topics: text('topics').array(),
  language: text('language'),
  imageUrl: text('image_url'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export type CustomProject = typeof customProjects.$inferSelect;
