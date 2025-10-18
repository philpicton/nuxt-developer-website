---
title: "Getting Started with This Template"
description: "A guide to customizing your new frontend developer website"
date: "2024-01-15"
tags: ["nuxt", "template", "tutorial"]
---

# Getting Started with This Template

Welcome to your new frontend developer website! This post will guide you through the customization process.

## Quick Start

1. **Install dependencies**: Run `bun install` in your terminal
2. **Start dev server**: Run `bun run dev`
3. **Visit**: Open `http://localhost:3000` in your browser

## Customizing Content

### Homepage

Edit `content/home.md` to update your homepage introduction. This is the first thing visitors will see!

### About Page

Update `content/about.md` with your background, skills, and experience.

### Blog Posts

Create new blog posts in `content/writing/` directory. Each post should have frontmatter with:

- `title`: Your post title
- `description`: A brief summary
- `date`: Publication date (YYYY-MM-DD)
- `tags`: Array of relevant tags

### Projects

Add your projects in `content/projects/` directory. Include images in `public/images/projects/`.

## Styling

The template uses Tailwind CSS. Customize colors and styles in:

- `assets/css/main.css` - Global styles
- `nuxt.config.ts` - Tailwind configuration
- Component files - Scoped styles

## Deployment

This template is configured to deploy to Cloudflare Workers via NuxtHub. See the README for deployment instructions.

Happy coding! 🚀
