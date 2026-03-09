# mis8680.github.io

Source for Insu Mun's portfolio site, built with Astro and Tailwind CSS and deployed with GitHub Pages.

Live site: [https://mis8680.github.io/](https://mis8680.github.io/)

## Overview

- Single-page portfolio site
- Astro 5 + Tailwind CSS 4
- Static output generated into `./docs/`
- GitHub Pages deploys from `main`

## Local development

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Build the site into `./docs/`:

```bash
npm run build
```

Run Astro's project checks:

```bash
npm run check
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

- GitHub Pages publishes from the `main` branch through the workflow in `.github/workflows/deploy.yml`
- The Astro build writes the published site into `./docs/`
- `scripts/build-docs.mjs` preserves content in `./docs/plans/` while rebuilding the generated site output

## Repository conventions

- Store project documentation under `./docs/`
- Store implementation plans under `./docs/plans/`
- Do not add new top-level documentation directories outside `./docs/`
- Use `npm run build` and `npm run check` for verification
