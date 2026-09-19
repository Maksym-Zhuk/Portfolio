import { pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const aboutMe = pgTable('about_me', {
  id: integer('id').primaryKey().default(1),
  rustCode: text('rust_code').notNull().default(''),
  tsCode: text('ts_code').notNull().default(''),
  nestCode: text('nest_code').notNull().default(''),
  hrSummary: text('hr_summary').notNull().default(''),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type AboutMe = typeof aboutMe.$inferSelect;
