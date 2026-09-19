import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const projectImages = pgTable('project_images', {
  id: serial('id').primaryKey(),
  repoName: text('repo_name').notNull().unique(),
  imageUrl: text('image_url').notNull(),
});

export type ProjectImage = typeof projectImages.$inferSelect;
