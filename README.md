# Frontend Developer Website Template

[![Nuxt 4](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A production-ready website template for frontend developers built with Nuxt 4, TypeScript, and Tailwind CSS. Features a blog, portfolio showcase, contact form with email integration, and automated CI/CD. Deploy to Cloudflare Workers via NuxtHub.

## Features

- **Nuxt 4 & TypeScript** - Vue 3 framework with server-side rendering and full type safety
- **Bun** - Fast JavaScript runtime and package manager
- **Tailwind CSS v4** - Utility-first CSS framework with dark mode support
- **Nuxt Content** - Markdown-powered blog and portfolio with tag system
- **Contact Form** - Email delivery via Resend API with anti-spam protection and rate limiting
- **Testing** - Comprehensive unit test suite with Vitest
- **CI/CD** - Automated linting, formatting, type checking, testing, and deployment
- **Security** - Dependabot with auto-merge for safe updates, weekly vulnerability audits, branch protection

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- GitHub account (for deployment)
- [NuxtHub](https://hub.nuxt.com/) account (for hosting)

### Installation

```bash
# Install dependencies
bun install

# Copy environment variables
cp .env.example .env
# Edit .env with your values (see below)

# Start development server
bun run dev
```

Visit `http://localhost:3000`

### Environment Variables

Create a `.env` file:

```env
# NuxtHub Configuration
NUXT_HUB_PROJECT_KEY=your_nuxthub_project_key

# Email Configuration (optional - for contact form)
RESEND_API_KEY=your_resend_api_key
MAIL_FROM=noreply@yourdomain.com
MAIL_TO=your@email.com

# Rate Limiting
MAX_SUBMISSIONS=3
RATE_LIMIT_TTL_SECONDS=3600
```

## Development Commands

```bash
# Development
bun run dev              # Start development server
bun run build            # Build for production
bun run preview          # Preview production build

# Testing
bun run test             # Run tests in watch mode
bun run test -- --run    # Run tests once (CI mode)

# Code Quality
bun run lint             # Run ESLint
bun run format           # Format code with Prettier
bun run format:check     # Check formatting
bun run typecheck        # TypeScript type checking
bun run check            # Run all quality checks

# Security
bun run audit            # Check for vulnerabilities
bun run audit:fix        # Auto-fix vulnerabilities
bun run outdated         # Check for outdated packages
```

## Project Structure

```
.
├── .github/
│   ├── workflows/       # CI/CD pipelines
│   ├── dependabot.yml   # Dependency updates
│   └── *.md             # GitHub setup documentation
├── assets/css/          # Global styles
├── components/          # Vue components
├── content/             # Markdown content
│   ├── writing/         # Blog posts
│   └── projects/        # Portfolio projects
├── layouts/             # Page layouts
├── pages/               # File-based routing
├── public/              # Static assets
├── server/api/          # Serverless API routes
├── tests/               # Unit test suite
├── types/               # TypeScript definitions
└── nuxt.config.ts       # Nuxt configuration
```

## Content Management

### Create a Blog Post

```bash
touch content/writing/my-post.md
```

```markdown
---
title: "My Post Title"
description: "Post description"
date: "2024-01-01"
tags: ["nuxt", "typescript"]
image: "/images/post.jpg"
---

Your content here...
```

### Create a Project

```bash
touch content/projects/my-project.md
```

```markdown
---
title: "Project Name"
description: "Brief description"
date: "2024-01-01"
tags: ["tech", "stack"]
image: "/images/projects/project.jpg"
featured: true
---

Project details...
```

## Deployment

### Automated Deployment (Recommended)

Every push to `main` automatically:

1. Runs quality checks (lint, format, typecheck)
2. Executes unit tests
3. Builds the project
4. Deploys to NuxtHub/Cloudflare

### Initial Setup

1. Fork this repository to your GitHub account

2. Check it out locally and set up environment variables in `.env`

3. **Create NuxtHub Project**
    - Visit [hub.nuxt.com](https://hub.nuxt.com)
    - Create new project and link Cloudflare account
    - Link your GitHub repository in NuxtHub
    - Add environment variables
    - Optional add a custom domain in NuxtHub/Cloudflare

4. **Configure Repository Settings**
    - See [GitHub Settings Guide](.github/GITHUB_SETTINGS.md) for detailed instructions
    - Enable branch protection with required status checks
    - Enable Dependabot for automated dependency updates
    - Configure Actions permissions (read/write)
    - Push to your `main` branch to trigger deployment (or if you have not added a rule exception for the repo admin, you need to create a PR and merge it to deploy updates.)

### Manual Deployment

```bash
# Build the project
bun run build

# Deploy to NuxtHub
npx nuxthub deploy
```

## Testing

The project includes unit tests covering components and pages:

```bash
# Run all tests
bun run test

# Run specific test file
bun run test -- BackButton.test.ts

# Run tests in CI mode
bun run test -- --run
```

Tests run automatically in CI/CD and block merges/deployments if failing.

## Security

### Automated Security Features

- **Dependabot** - Weekly dependency scans with auto-merge for patch/minor updates
- **Security Audits** - Weekly vulnerability scans with `bun audit`
- **Branch Protection** - Required status checks block bad code from reaching production
- **Contact Form Security** - Honeypot, rate limiting, input sanitization, XSS prevention

### Contact Form Features

- Email delivery via Resend API
- Honeypot anti-spam field
- Rate limiting with Cloudflare KV (configurable IP-based limits)
- Server-side validation and sanitization
- XSS prevention

## Customization

### Content

1. **Homepage** - Edit `content/home.md` with your introduction
2. **About Page** - Edit `content/about.md` with your background
3. **Blog Posts** - Replace examples in `content/writing/`
4. **Projects** - Replace examples in `content/projects/`
5. **Images** - Add your images to `public/images/`
6. **Footer** - Update `components/SiteFooter.vue` with your name

### Styling

- **Main styles** - Edit `assets/css/main.css`
- **Tailwind config** - Modify `nuxt.config.ts`
- **Component styles** - Each component has scoped CSS

### Configuration

- **App config** - Edit `app.config.ts`
- **Nuxt config** - Edit `nuxt.config.ts`
- **Content config** - Edit `content.config.ts`

## Technology Stack

| Category      | Technology                   |
| ------------- | ---------------------------- |
| **Framework** | Nuxt 4, Vue 3                |
| **Language**  | TypeScript (strict mode)     |
| **Runtime**   | Bun                          |
| **Styling**   | Tailwind CSS v4              |
| **Content**   | Nuxt Content (Markdown)      |
| **Testing**   | Vitest                       |
| **Linting**   | ESLint, Prettier             |
| **Hosting**   | Cloudflare Workers (NuxtHub) |
| **Database**  | Cloudflare D1                |
| **KV Store**  | Cloudflare KV                |
| **Email**     | Resend API                   |
| **CI/CD**     | GitHub Actions               |

## Further Documentation

- [GitHub Settings Guide](.github/GITHUB_SETTINGS.md) - Complete repository setup with branch protection
- [Quick Reference](.github/SETTINGS_QUICK_REFERENCE.md) - Fast setup checklist
- [Dependabot Guide](.github/DEPENDABOT.md) - Dependency management and security

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Issues and pull requests welcome, fork and create a branch, then a PR. All code quality checks must pass.

---

Built with Nuxt 4 • Deploy on Cloudflare Workers via NuxtHub
