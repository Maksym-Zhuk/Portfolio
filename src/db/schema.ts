import { pgTable, serial, text, integer, boolean, timestamp, date } from 'drizzle-orm/pg-core';

export const aboutMe = pgTable('about_me', {
  id: integer('id').primaryKey().default(1),
  rustCode: text('rust_code').notNull().default(''),
  tsCode: text('ts_code').notNull().default(''),
  nestCode: text('nest_code').notNull().default(''),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  logoUrl: text('logo_url').notNull(),
  title: text('title').notNull(),
  firstTried: date('first_tried').notNull(),
  category: text('category').notNull(), // Language | Backend | Database | Fullstack | DevOps | Frontend
  description: text('description').notNull(),
  docsUrl: text('docs_url').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  iconUrl: text('icon_url').notNull(),
  link: text('link').notNull(),
  handle: text('handle'),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const organizations = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull().default(''),
  githubUrl: text('github_url').notNull(),
  websiteUrl: text('website_url'),
  roleBadge: text('role_badge'), // e.g. "Lead Developer"
  version: text('version'),
  languageName: text('language_name'),
  languagePct: integer('language_pct'),
  releasesCount: integer('releases_count'),
  license: text('license'),
  status: text('status'),
  tags: text('tags').array(),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const githubOrgs = pgTable('github_orgs', {
  id: serial('id').primaryKey(),
  orgLogin: text('org_login').notNull().unique(),
  displayName: text('display_name').notNull(),
  enabled: boolean('enabled').notNull().default(true),
});

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

export const projectImages = pgTable('project_images', {
  id: serial('id').primaryKey(),
  repoName: text('repo_name').notNull().unique(),
  imageUrl: text('image_url').notNull(),
});

// Type exports for use in components
export type AboutMe = typeof aboutMe.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type Organization = typeof organizations.$inferSelect;
export type GithubOrg = typeof githubOrgs.$inferSelect;
export type CustomProject = typeof customProjects.$inferSelect;
export type ProjectImage = typeof projectImages.$inferSelect;
