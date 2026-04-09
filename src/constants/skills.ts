import { Skill } from '@/types/skills';

export const Skills: Skill[] = [
  // ── Languages ─────────────────────────────────────────────
  {
    logo: '/Rust.svg',
    title: 'Rust',
    firstTried: '2025-07-22',
    category: 'Language',
    description:
      'Systems programming language focused on memory safety and zero-cost abstractions. Used to build the Oxide CLI tool and explore low-level performance-critical code with Tokio and Axum.',
    docsUrl: 'https://doc.rust-lang.org/',
  },
  {
    logo: '/TypeScript.svg',
    title: 'TypeScript',
    firstTried: '2024-12-18',
    category: 'Language',
    description:
      'Statically typed superset of JavaScript. Primary language across all backend (NestJS, Fastify) and full-stack projects, enabling strict type safety and better developer tooling.',
    docsUrl: 'https://www.typescriptlang.org/docs/',
  },
  {
    logo: '/JavaScript.svg',
    title: 'JavaScript',
    firstTried: '2023-10-22',
    category: 'Language',
    description:
      'Foundation of web development. Used before adopting TypeScript; now serves as the runtime substrate for all Node.js-based backend and browser code.',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },

  // ── Backend ───────────────────────────────────────────────
  {
    logo: '/Nest.js.svg',
    title: 'Nest.js',
    firstTried: '2025-02-09',
    category: 'Backend',
    description:
      'Opinionated Node.js framework built on TypeScript with decorator-based architecture. Primary framework for building structured REST APIs, microservices, and GraphQL servers.',
    docsUrl: 'https://docs.nestjs.com/',
  },
  {
    logo: '/Fastify.svg',
    title: 'Fastify',
    firstTried: '2025-06-21',
    category: 'Backend',
    description:
      'High-throughput Node.js web framework with a low-overhead plugin system. Used as a lean alternative to Express for performance-critical APIs and as the NestJS HTTP adapter.',
    docsUrl: 'https://fastify.dev/docs/latest/',
  },
  {
    logo: '/Node.js.svg',
    title: 'Node.js',
    firstTried: '2024-08-01',
    category: 'Backend',
    description:
      'JavaScript runtime built on V8. The foundation for all server-side TypeScript work — running NestJS, Fastify, and Express applications in production environments.',
    docsUrl: 'https://nodejs.org/docs/latest/api/',
  },
  {
    logo: '/Express.svg',
    title: 'Express',
    firstTried: '2024-09-20',
    category: 'Backend',
    description:
      'Minimalist Node.js web framework. First backend framework learned; used for building REST APIs and as the underlying transport layer in early NestJS projects.',
    docsUrl: 'https://expressjs.com/',
  },
  {
    logo: '/Mongoose.js.svg',
    title: 'Mongoose.js',
    firstTried: '2024-09-20',
    category: 'Backend',
    description:
      'MongoDB ODM for Node.js providing schema validation and query building. Used in early backend projects for structured interaction with MongoDB collections.',
    docsUrl: 'https://mongoosejs.com/docs/',
  },
  {
    logo: '/108468352.png',
    title: 'Drizzle',
    firstTried: '2025-05-15',
    category: 'Backend',
    description:
      'TypeScript-first ORM with a SQL-like query builder. Preferred ORM for PostgreSQL projects — lightweight, type-safe, and composable without the magic of heavier ORMs.',
    docsUrl: 'https://orm.drizzle.team/docs/overview',
  },
  {
    logo: '/passport.svg',
    title: 'Passport JS',
    firstTried: '2024-11-28',
    category: 'Backend',
    description:
      'Authentication middleware for Node.js with a strategy-based architecture. Used to implement JWT, OAuth2, and session-based authentication flows in NestJS applications.',
    docsUrl: 'https://www.passportjs.org/docs/',
  },
  {
    logo: '/Telegram_logo.svg.webp',
    title: 'Telegram bot API',
    firstTried: '2024-10-03',
    category: 'Backend',
    description:
      'HTTP-based API for building Telegram bots. Used to create automated notification systems, backend integrations, and interactive bots powered by Node.js.',
    docsUrl: 'https://core.telegram.org/bots/api',
  },

  // ── Database ──────────────────────────────────────────────
  {
    logo: '/PostgresSQL.svg',
    title: 'PostgresSQL',
    firstTried: '2025-05-15',
    category: 'Database',
    description:
      'Advanced open-source relational database. Primary production database for structured data — used with Drizzle ORM and raw SQL for complex queries and migrations.',
    docsUrl: 'https://www.postgresql.org/docs/',
  },
  {
    logo: '/MongoDB.svg',
    title: 'MongoDB',
    firstTried: '2024-09-20',
    category: 'Database',
    description:
      'Document-oriented NoSQL database with flexible schema design. Used in earlier projects for unstructured or rapidly evolving data models via Mongoose.',
    docsUrl: 'https://www.mongodb.com/docs/',
  },
  {
    logo: '/Redis.svg',
    title: 'Redis',
    firstTried: '2025-03-20',
    category: 'Database',
    description:
      'In-memory data structure store. Used for response caching, distributed session management, rate limiting, and pub/sub messaging between backend services.',
    docsUrl: 'https://redis.io/docs/',
  },

  // ── Full Stack ────────────────────────────────────────────
  {
    logo: '/Next.js.svg',
    title: 'Next.js',
    firstTried: '2025-04-03',
    category: 'Fullstack',
    description:
      'React meta-framework with SSR, SSG, and App Router. Used for building full-stack web applications including this portfolio, with server components and API routes.',
    docsUrl: 'https://nextjs.org/docs',
  },
  {
    logo: '/GraphQL.svg',
    title: 'GraphQL',
    firstTried: '2025-05-18',
    category: 'Fullstack',
    description:
      'Query language and runtime for APIs. Used as an alternative to REST to give clients precise control over data fetching, integrated into NestJS via the dedicated module.',
    docsUrl: 'https://graphql.org/learn/',
  },
  {
    logo: '/apollo-graphql-compact.svg',
    title: 'Apollo',
    firstTried: '2025-05-18',
    category: 'Fullstack',
    description:
      'GraphQL client and server toolkit. Used for schema-first API design on the server and efficient cache-aware data fetching on the client side.',
    docsUrl: 'https://www.apollographql.com/docs/',
  },
  {
    logo: '/RabbitMQ.svg',
    title: 'RabbitMQ',
    firstTried: '2025-06-05',
    category: 'Fullstack',
    description:
      'Message broker implementing AMQP. Used to decouple microservices with asynchronous message queues, enabling reliable event-driven communication between services.',
    docsUrl: 'https://www.rabbitmq.com/docs',
  },

  // ── DevOps & Tools ────────────────────────────────────────
  {
    logo: '/Docker.svg',
    title: 'Docker',
    firstTried: '2025-02-14',
    category: 'DevOps',
    description:
      'Containerization platform. Used to package applications with their dependencies, manage local dev environments via Compose, and prepare images for deployment.',
    docsUrl: 'https://docs.docker.com/',
  },
  {
    logo: '/1_amx8k-Upat1L7RzluiMcow.png',
    title: 'NX',
    firstTried: '2025-05-25',
    category: 'DevOps',
    description:
      'Monorepo build system with smart caching and task orchestration. Used to manage multi-package TypeScript repositories with shared libraries and coordinated builds.',
    docsUrl: 'https://nx.dev/docs',
  },
  {
    logo: '/Git.svg',
    title: 'Git',
    firstTried: '2025-02-09',
    category: 'DevOps',
    description:
      'Distributed version control system. Used daily for branching, code review workflows, rebasing, and maintaining clean commit history across all projects.',
    docsUrl: 'https://git-scm.com/doc',
  },
  {
    logo: '/GitHub.svg',
    title: 'GitHub',
    firstTried: '2023-10-26',
    category: 'DevOps',
    description:
      'Git hosting and collaboration platform. Primary home for all code — used for open-source work at the Oxide organization, CI/CD pipelines, and issue tracking.',
    docsUrl: 'https://docs.github.com/',
  },
  {
    logo: '/Bun.svg',
    title: 'Bun',
    firstTried: '2025-04-03',
    category: 'DevOps',
    description:
      'Fast all-in-one JavaScript runtime, bundler, and package manager. Preferred toolchain for new projects — significantly faster installs and script execution than npm.',
    docsUrl: 'https://bun.sh/docs',
  },
  {
    logo: '/Yarn.svg',
    title: 'Yarn',
    firstTried: '2025-02-09',
    category: 'DevOps',
    description:
      'JavaScript package manager with workspaces support. Used in earlier monorepo projects before switching to Bun; still encountered in legacy codebases.',
    docsUrl: 'https://yarnpkg.com/getting-started',
  },
  {
    logo: '/Swagger.svg',
    title: 'Swagger',
    firstTried: '2025-02-28',
    category: 'DevOps',
    description:
      'API documentation tool implementing the OpenAPI specification. Used with the NestJS Swagger module to auto-generate interactive API docs from decorators.',
    docsUrl: 'https://swagger.io/docs/',
  },

  // ── Frontend ──────────────────────────────────────────────
  {
    logo: '/React.svg',
    title: 'React',
    firstTried: '2024-12-25',
    category: 'Frontend',
    description:
      'Declarative UI component library. Used for building interactive frontends — combined with Next.js App Router for server components and TanStack Query for data fetching.',
    docsUrl: 'https://react.dev/',
  },
  {
    logo: '/Tailwind CSS.svg',
    title: 'Tailwind CSS',
    firstTried: '2025-01-08',
    category: 'Frontend',
    description:
      'Utility-first CSS framework. Used for all recent frontend styling — enables rapid layout iteration while keeping styles co-located with components.',
    docsUrl: 'https://tailwindcss.com/docs',
  },
  {
    logo: '/1_O-ClkORJkmUm1wRsApB_yQ.png',
    title: 'Shadcn',
    firstTried: '2025-04-13',
    category: 'Frontend',
    description:
      'Accessible component library built on Radix UI primitives and Tailwind CSS. Used for production-grade UI components that are customizable and owned in the codebase.',
    docsUrl: 'https://ui.shadcn.com/docs',
  },
  {
    logo: '/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg',
    title: 'Zustand',
    firstTried: '2025-02-20',
    category: 'Frontend',
    description:
      'Minimal React state management library. Used for global client state where React Query is insufficient — lightweight alternative to Redux with a hook-based API.',
    docsUrl: 'https://zustand.docs.pmnd.rs/',
  },
  {
    logo: '/1_elhu-42TzQEdsFjKDbQhhA.png',
    title: 'React Query',
    firstTried: '2025-02-20',
    category: 'Frontend',
    description:
      'Server state management for React. Used for data fetching, background refetching, and cache management — the backbone of the projects page GitHub API integration.',
    docsUrl: 'https://tanstack.com/query/latest/docs',
  },
  {
    logo: '/Vite.js.svg',
    title: 'Vite.js',
    firstTried: '2024-12-25',
    category: 'Frontend',
    description:
      'Fast build tool and development server powered by native ES modules. Used for standalone React applications outside the Next.js ecosystem.',
    docsUrl: 'https://vite.dev/guide/',
  },
  {
    logo: '/HTML5.svg',
    title: 'HTML',
    firstTried: '2023-06-5',
    category: 'Frontend',
    description:
      'Standard markup language for web pages. The foundation of all web development — learned first, now written primarily through JSX in React and Next.js components.',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  },
  {
    logo: '/CSS3.svg',
    title: 'CSS',
    firstTried: '2023-06-29',
    category: 'Frontend',
    description:
      'Stylesheet language for web presentation. Core styling skill learned before adopting Tailwind CSS; still used for global styles, CSS variables, and custom animations.',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  },
  {
    logo: '/Sass.svg',
    title: 'SCSS',
    firstTried: '2023-09-11',
    category: 'Frontend',
    description:
      'CSS preprocessor adding variables, nesting, and mixins. Used in component-based projects before switching to Tailwind CSS for utility-first styling.',
    docsUrl: 'https://sass-lang.com/documentation/',
  },
  {
    logo: '/jQuery.svg',
    title: 'jQuery',
    firstTried: '2024-02-21',
    category: 'Frontend',
    description:
      'JavaScript library for DOM manipulation and AJAX. Early frontend tool learned before React; now fully replaced by modern React patterns in all active projects.',
    docsUrl: 'https://api.jquery.com/',
  },
  {
    logo: '/Telegram_logo.svg.webp',
    title: 'Telegram Web App',
    firstTried: '2025-05-21',
    category: 'Frontend',
    description:
      'Telegram Mini Apps platform for embedding web interfaces inside Telegram clients. Used to build React-based UIs that interact with Telegram bots and their backend.',
    docsUrl: 'https://core.telegram.org/bots/webapps',
  },
];
