/**
 * One-time seed script. Run with: bun run seed
 * Populates the DB from static constants and hardcoded component values.
 */
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../src/db/schema';

// Load .env.local first, fall back to .env (bun reads .env automatically but not .env.local)
import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' }); // fallback — dotenv skips vars already set

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

// ── About Me code snippets (from AboutMe.tsx) ─────────────────────────────────

const RUST_CODE = `// about_me.rs

pub struct Developer<'a> {
    pub name: &'a str,
    pub role: &'a str,
    pub focus: &'a [&'a str],
    pub org: &'a str,
}

impl<'a> Developer<'a> {
    pub fn new() -> Self {
        Self {
            name: "Maksym Zhuk",
            role: "Backend Engineer",
            focus: &[
                "High-performance APIs",
                "Microservice architecture",
                "Systems programming",
                "Database design",
            ],
            org: "Oxide (Lead Developer)",
        }
    }

    pub fn introduce(&self) -> String {
        format!(
            "{} | {}\\n\\
             Scalable backend systems with \\
             NestJS, Fastify & Rust.\\n\\
             Lead dev at {}.",
            self.name, self.role, self.org,
        )
    }
}

fn main() {
    let me = Developer::new();
    println!("{}", me.introduce());
}`;

const TS_CODE = `// AboutMe.tsx
'use client';

import React from 'react';

interface Developer {
  name: string;
  role: string;
  focus: readonly string[];
  org: string;
}

const me: Developer = {
  name: 'Maksym Zhuk',
  role: 'Backend Engineer',
  focus: [
    'High-performance APIs',
    'Microservice architecture',
    'Systems programming',
    'Database design',
  ],
  org: 'Oxide (Lead Developer)',
};

function introduce(dev: Developer): string {
  return [
    \`\${dev.name} | \${dev.role}\`,
    \`Focus: \${dev.focus.join(', ')}.\`,
    \`Lead dev at \${dev.org}.\`,
  ].join('\\n');
}

export default function Page() {
  return <pre>{introduce(me)}</pre>;
}`;

const NEST_CODE = `// developer.controller.ts
import {
  Controller,
  Get,
  Injectable,
} from '@nestjs/common';

interface DeveloperProfile {
  name: string;
  role: string;
  focus: string[];
  org: string;
}

@Injectable()
class DeveloperService {
  private readonly profile: DeveloperProfile = {
    name: 'Maksym Zhuk',
    role: 'Backend Engineer',
    focus: [
      'High-performance APIs',
      'Microservice architecture',
      'Systems programming',
      'Database design',
    ],
    org: 'Oxide (Lead Developer)',
  };

  getProfile(): DeveloperProfile {
    return this.profile;
  }
}

@Controller('developer')
export class DeveloperController {
  constructor(
    private readonly svc: DeveloperService,
  ) {}

  @Get()
  getProfile(): DeveloperProfile {
    return this.svc.getProfile();
  }
}`;

// ── Skills (from src/constants/skills.ts) ─────────────────────────────────────

const SKILLS_DATA = [
  { logoUrl: '/Rust.svg', title: 'Rust', firstTried: '2025-07-22', category: 'Language', description: 'Systems programming language focused on memory safety and zero-cost abstractions. Used to build the Oxide CLI tool and explore low-level performance-critical code with Tokio and Axum.', docsUrl: 'https://doc.rust-lang.org/' },
  { logoUrl: '/TypeScript.svg', title: 'TypeScript', firstTried: '2024-12-18', category: 'Language', description: 'Statically typed superset of JavaScript. Primary language across all backend (NestJS, Fastify) and full-stack projects, enabling strict type safety and better developer tooling.', docsUrl: 'https://www.typescriptlang.org/docs/' },
  { logoUrl: '/JavaScript.svg', title: 'JavaScript', firstTried: '2023-10-22', category: 'Language', description: 'Foundation of web development. Used before adopting TypeScript; now serves as the runtime substrate for all Node.js-based backend and browser code.', docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { logoUrl: '/Nest.js.svg', title: 'Nest.js', firstTried: '2025-02-09', category: 'Backend', description: 'Opinionated Node.js framework built on TypeScript with decorator-based architecture. Primary framework for building structured REST APIs, microservices, and GraphQL servers.', docsUrl: 'https://docs.nestjs.com/' },
  { logoUrl: '/Fastify.svg', title: 'Fastify', firstTried: '2025-06-21', category: 'Backend', description: 'High-throughput Node.js web framework with a low-overhead plugin system. Used as a lean alternative to Express for performance-critical APIs and as the NestJS HTTP adapter.', docsUrl: 'https://fastify.dev/docs/latest/' },
  { logoUrl: '/Node.js.svg', title: 'Node.js', firstTried: '2024-08-01', category: 'Backend', description: 'JavaScript runtime built on V8. The foundation for all server-side TypeScript work — running NestJS, Fastify, and Express applications in production environments.', docsUrl: 'https://nodejs.org/docs/latest/api/' },
  { logoUrl: '/Express.svg', title: 'Express', firstTried: '2024-09-20', category: 'Backend', description: 'Minimalist Node.js web framework. First backend framework learned; used for building REST APIs and as the underlying transport layer in early NestJS projects.', docsUrl: 'https://expressjs.com/' },
  { logoUrl: '/Mongoose.js.svg', title: 'Mongoose.js', firstTried: '2024-09-20', category: 'Backend', description: 'MongoDB ODM for Node.js providing schema validation and query building. Used in early backend projects for structured interaction with MongoDB collections.', docsUrl: 'https://mongoosejs.com/docs/' },
  { logoUrl: '/108468352.png', title: 'Drizzle', firstTried: '2025-05-15', category: 'Backend', description: 'TypeScript-first ORM with a SQL-like query builder. Preferred ORM for PostgreSQL projects — lightweight, type-safe, and composable without the magic of heavier ORMs.', docsUrl: 'https://orm.drizzle.team/docs/overview' },
  { logoUrl: '/passport.svg', title: 'Passport JS', firstTried: '2024-11-28', category: 'Backend', description: 'Authentication middleware for Node.js with a strategy-based architecture. Used to implement JWT, OAuth2, and session-based authentication flows in NestJS applications.', docsUrl: 'https://www.passportjs.org/docs/' },
  { logoUrl: '/Telegram_logo.svg.webp', title: 'Telegram bot API', firstTried: '2024-10-03', category: 'Backend', description: 'HTTP-based API for building Telegram bots. Used to create automated notification systems, backend integrations, and interactive bots powered by Node.js.', docsUrl: 'https://core.telegram.org/bots/api' },
  { logoUrl: '/PostgresSQL.svg', title: 'PostgresSQL', firstTried: '2025-05-15', category: 'Database', description: 'Advanced open-source relational database. Primary production database for structured data — used with Drizzle ORM and raw SQL for complex queries and migrations.', docsUrl: 'https://www.postgresql.org/docs/' },
  { logoUrl: '/MongoDB.svg', title: 'MongoDB', firstTried: '2024-09-20', category: 'Database', description: 'Document-oriented NoSQL database with flexible schema design. Used in earlier projects for unstructured or rapidly evolving data models via Mongoose.', docsUrl: 'https://www.mongodb.com/docs/' },
  { logoUrl: '/Redis.svg', title: 'Redis', firstTried: '2025-03-20', category: 'Database', description: 'In-memory data structure store. Used for response caching, distributed session management, rate limiting, and pub/sub messaging between backend services.', docsUrl: 'https://redis.io/docs/' },
  { logoUrl: '/Next.js.svg', title: 'Next.js', firstTried: '2025-04-03', category: 'Fullstack', description: 'React meta-framework with SSR, SSG, and App Router. Used for building full-stack web applications including this portfolio, with server components and API routes.', docsUrl: 'https://nextjs.org/docs' },
  { logoUrl: '/GraphQL.svg', title: 'GraphQL', firstTried: '2025-05-18', category: 'Fullstack', description: 'Query language and runtime for APIs. Used as an alternative to REST to give clients precise control over data fetching, integrated into NestJS via the dedicated module.', docsUrl: 'https://graphql.org/learn/' },
  { logoUrl: '/apollo-graphql-compact.svg', title: 'Apollo', firstTried: '2025-05-18', category: 'Fullstack', description: 'GraphQL client and server toolkit. Used for schema-first API design on the server and efficient cache-aware data fetching on the client side.', docsUrl: 'https://www.apollographql.com/docs/' },
  { logoUrl: '/RabbitMQ.svg', title: 'RabbitMQ', firstTried: '2025-06-05', category: 'Fullstack', description: 'Message broker implementing AMQP. Used to decouple microservices with asynchronous message queues, enabling reliable event-driven communication between services.', docsUrl: 'https://www.rabbitmq.com/docs' },
  { logoUrl: '/Docker.svg', title: 'Docker', firstTried: '2025-02-14', category: 'DevOps', description: 'Containerization platform. Used to package applications with their dependencies, manage local dev environments via Compose, and prepare images for deployment.', docsUrl: 'https://docs.docker.com/' },
  { logoUrl: '/1_amx8k-Upat1L7RzluiMcow.png', title: 'NX', firstTried: '2025-05-25', category: 'DevOps', description: 'Monorepo build system with smart caching and task orchestration. Used to manage multi-package TypeScript repositories with shared libraries and coordinated builds.', docsUrl: 'https://nx.dev/docs' },
  { logoUrl: '/Git.svg', title: 'Git', firstTried: '2025-02-09', category: 'DevOps', description: 'Distributed version control system. Used daily for branching, code review workflows, rebasing, and maintaining clean commit history across all projects.', docsUrl: 'https://git-scm.com/doc' },
  { logoUrl: '/GitHub.svg', title: 'GitHub', firstTried: '2023-10-26', category: 'DevOps', description: 'Git hosting and collaboration platform. Primary home for all code — used for open-source work at the Oxide organization, CI/CD pipelines, and issue tracking.', docsUrl: 'https://docs.github.com/' },
  { logoUrl: '/Bun.svg', title: 'Bun', firstTried: '2025-04-03', category: 'DevOps', description: 'Fast all-in-one JavaScript runtime, bundler, and package manager. Preferred toolchain for new projects — significantly faster installs and script execution than npm.', docsUrl: 'https://bun.sh/docs' },
  { logoUrl: '/Yarn.svg', title: 'Yarn', firstTried: '2025-02-09', category: 'DevOps', description: 'JavaScript package manager with workspaces support. Used in earlier monorepo projects before switching to Bun; still encountered in legacy codebases.', docsUrl: 'https://yarnpkg.com/getting-started' },
  { logoUrl: '/Swagger.svg', title: 'Swagger', firstTried: '2025-02-28', category: 'DevOps', description: 'API documentation tool implementing the OpenAPI specification. Used with the NestJS Swagger module to auto-generate interactive API docs from decorators.', docsUrl: 'https://swagger.io/docs/' },
  { logoUrl: '/React.svg', title: 'React', firstTried: '2024-12-25', category: 'Frontend', description: 'Declarative UI component library. Used for building interactive frontends — combined with Next.js App Router for server components and TanStack Query for data fetching.', docsUrl: 'https://react.dev/' },
  { logoUrl: '/Tailwind CSS.svg', title: 'Tailwind CSS', firstTried: '2025-01-08', category: 'Frontend', description: 'Utility-first CSS framework. Used for all recent frontend styling — enables rapid layout iteration while keeping styles co-located with components.', docsUrl: 'https://tailwindcss.com/docs' },
  { logoUrl: '/1_O-ClkORJkmUm1wRsApB_yQ.png', title: 'Shadcn', firstTried: '2025-04-13', category: 'Frontend', description: 'Accessible component library built on Radix UI primitives and Tailwind CSS. Used for production-grade UI components that are customizable and owned in the codebase.', docsUrl: 'https://ui.shadcn.com/docs' },
  { logoUrl: '/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg', title: 'Zustand', firstTried: '2025-02-20', category: 'Frontend', description: 'Minimal React state management library. Used for global client state where React Query is insufficient — lightweight alternative to Redux with a hook-based API.', docsUrl: 'https://zustand.docs.pmnd.rs/' },
  { logoUrl: '/1_elhu-42TzQEdsFjKDbQhhA.png', title: 'React Query', firstTried: '2025-02-20', category: 'Frontend', description: 'Server state management for React. Used for data fetching, background refetching, and cache management — the backbone of the projects page GitHub API integration.', docsUrl: 'https://tanstack.com/query/latest/docs' },
  { logoUrl: '/Vite.js.svg', title: 'Vite.js', firstTried: '2024-12-25', category: 'Frontend', description: 'Fast build tool and development server powered by native ES modules. Used for standalone React applications outside the Next.js ecosystem.', docsUrl: 'https://vite.dev/guide/' },
  { logoUrl: '/HTML5.svg', title: 'HTML', firstTried: '2023-06-05', category: 'Frontend', description: 'Standard markup language for web pages. The foundation of all web development — learned first, now written primarily through JSX in React and Next.js components.', docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { logoUrl: '/CSS3.svg', title: 'CSS', firstTried: '2023-06-29', category: 'Frontend', description: 'Stylesheet language for web presentation. Core styling skill learned before adopting Tailwind CSS; still used for global styles, CSS variables, and custom animations.', docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { logoUrl: '/Sass.svg', title: 'SCSS', firstTried: '2023-09-11', category: 'Frontend', description: 'CSS preprocessor adding variables, nesting, and mixins. Used in component-based projects before switching to Tailwind CSS for utility-first styling.', docsUrl: 'https://sass-lang.com/documentation/' },
  { logoUrl: '/jQuery.svg', title: 'jQuery', firstTried: '2024-02-21', category: 'Frontend', description: 'JavaScript library for DOM manipulation and AJAX. Early frontend tool learned before React; now fully replaced by modern React patterns in all active projects.', docsUrl: 'https://api.jquery.com/' },
  { logoUrl: '/Telegram_logo.svg.webp', title: 'Telegram Web App', firstTried: '2025-05-21', category: 'Frontend', description: 'Telegram Mini Apps platform for embedding web interfaces inside Telegram clients. Used to build React-based UIs that interact with Telegram bots and their backend.', docsUrl: 'https://core.telegram.org/bots/webapps' },
];

// ── Contacts (from constants + HANDLES map in ContactsScreen.tsx) ─────────────

const CONTACTS_DATA = [
  { title: 'Instagram', iconUrl: '/Instagram_icon.png', link: 'https://www.instagram.com/maksym_z_h_u_k/', handle: '@maksym_z_h_u_k', sortOrder: 0 },
  { title: 'Linkedin', iconUrl: '/LinkedIn_logo_initials.png.webp', link: 'https://www.linkedin.com/in/maksym-zhuk-417390252/', handle: 'Maksym Zhuk', sortOrder: 1 },
  { title: 'Telegram', iconUrl: '/Telegram_logo.svg.webp', link: 'https://t.me/Maksym_Zhuk7', handle: '@Maksym_Zhuk7', sortOrder: 2 },
  { title: 'Github', iconUrl: '/GitHub.svg', link: 'https://github.com/Maksym-Zhuk', handle: 'Maksym-Zhuk', sortOrder: 3 },
];

// ── Project images (from src/constants/projectImg.ts) ─────────────────────────
// Note: these are local /public paths. After seeding, upload them to Vercel Blob
// via /admin/projects and update the URLs there.

const PROJECT_IMAGES_DATA = [
  { repoName: 'fortuna', imageUrl: '/Screenshot 2025-06-27 002707.png' },
  { repoName: 'PastReverberance-Frontend', imageUrl: '/Screenshot 2025-07-29 at 18-53-31 Create Next App.png' },
  { repoName: 'Platform-for-parsing', imageUrl: '/Screenshot 2025-07-29 at 19-04-53 Document.png' },
];

async function seed() {
  console.log('🌱 Seeding database...');

  // 1. About Me
  console.log('  → about_me...');
  await db
    .insert(schema.aboutMe)
    .values({ id: 1, rustCode: RUST_CODE, tsCode: TS_CODE, nestCode: NEST_CODE })
    .onConflictDoNothing();

  // 2. Skills
  console.log('  → skills...');
  await db
    .insert(schema.skills)
    .values(SKILLS_DATA.map((s, i) => ({ ...s, sortOrder: i })))
    .onConflictDoNothing();

  // 3. Contacts
  console.log('  → contacts...');
  await db
    .insert(schema.contacts)
    .values(CONTACTS_DATA)
    .onConflictDoNothing();

  // 4. Project images
  console.log('  → project_images...');
  for (const img of PROJECT_IMAGES_DATA) {
    await db
      .insert(schema.projectImages)
      .values(img)
      .onConflictDoNothing();
  }

  // 5. Featured organization — Oxide
  console.log('  → organizations (Oxide)...');
  await db
    .insert(schema.organizations)
    .values({
      name: 'Oxide',
      slug: 'oxide-cli',
      description: 'Cross-platform project scaffolding CLI — oxide-cli organization on GitHub',
      githubUrl: 'https://github.com/oxide-cli',
      roleBadge: 'Lead Developer',
      languageName: 'Rust',
      sortOrder: 0,
    })
    .onConflictDoNothing();

  // 6. GitHub org
  console.log('  → github_orgs (oxide-cli)...');
  await db
    .insert(schema.githubOrgs)
    .values({ orgLogin: 'oxide-cli', displayName: 'Oxide', enabled: true })
    .onConflictDoNothing();

  console.log('✅ Seed complete!');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
