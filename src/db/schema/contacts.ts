import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull().unique(),
  iconUrl: text('icon_url').notNull(),
  link: text('link').notNull(),
  handle: text('handle'),
  sortOrder: integer('sort_order').notNull().default(0),
});

export type Contact = typeof contacts.$inferSelect;
