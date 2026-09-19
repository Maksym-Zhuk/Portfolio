import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core';

export const githubOrgs = pgTable('github_orgs', {
  id: serial('id').primaryKey(),
  orgLogin: text('org_login').notNull().unique(),
  displayName: text('display_name').notNull(),
  enabled: boolean('enabled').notNull().default(true),
});

export type GithubOrg = typeof githubOrgs.$inferSelect;
