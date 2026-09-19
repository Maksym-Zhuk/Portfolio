import { pgTable, serial, text, integer, date, timestamp } from 'drizzle-orm/pg-core';

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  logoUrl: text('logo_url').notNull(),
  title: text('title').notNull().unique(),
  firstTried: date('first_tried').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  docsUrl: text('docs_url').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Skill = typeof skills.$inferSelect;
