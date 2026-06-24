# Portfolio Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild mis8680.github.io as a modern dark-themed single-page portfolio with Astro + Tailwind CSS, deployed to GitHub Pages.

**Architecture:** Single-page Astro site with component-based sections (Nav, Hero, Projects, About, Contact, Footer). Cursor-reactive gradient glow on hero via vanilla JS. Bento grid for projects. Scroll-triggered fade-in animations via Intersection Observer. GitHub Actions deploys to Pages.

**Tech Stack:** Astro 5, Tailwind CSS 4, TypeScript, GitHub Actions

**Design reference:** `docs/plans/2026-03-06-portfolio-redesign-design.md`

---

### Task 1: Scaffold Astro Project

**Files:**
- Delete: `src/`, `public/`, `babel.config.js`, `vue.config.js`, `package.json`, `yarn.lock`
- Keep: `CNAME`, `README.md`, `.git/`, `docs/plans/`
- Create: New Astro project in place

**Step 1: Clean up old Vue project files**

```bash
rm -rf src/ public/ babel.config.js vue.config.js yarn.lock docs/css docs/js docs/img docs/index.html docs/favicon.ico
```

**Step 2: Initialize Astro project**

```bash
cd /Volumes/Insus/personal-projects/mis8680.github.io
npm create astro@latest . -- --template minimal --install --no-git --typescript strict
```

If prompted about overwriting files, accept. This creates `astro.config.mjs`, `tsconfig.json`, new `src/`, new `package.json`.

**Step 3: Install Tailwind CSS**

```bash
npx astro add tailwind --yes
```

**Step 4: Configure Astro for GitHub Pages**

Edit `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwindcss()],
  output: 'static',
  outDir: './docs',
  build: {
    assets: '_assets'
  }
});
```

**Step 5: Update .gitignore**

```
node_modules/
.DS_Store
.astro/
.env
.env.*
```

Note: Do NOT gitignore `docs/` since GitHub Pages serves from it.

**Step 6: Verify it builds**

```bash
npm run build
```

Expected: Build succeeds, output in `docs/`.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with Tailwind CSS"
```

---

### Task 2: Base Layout + Global Styles

**Files:**
- Create: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro`
- Create: `src/styles/global.css`

**Step 1: Create global CSS with Tailwind + custom properties**

`src/styles/global.css`:

```css
@import 'tailwindcss';

@theme {
  --color-background: #0a0a0a;
  --color-background-light: #fafafa;
  --color-surface: #141414;
  --color-surface-light: #ffffff;
  --color-border: #1a1a1a;
  --color-border-light: #e5e5e5;
  --color-text: #e5e5e5;
  --color-text-light: #1a1a1a;
  --color-text-muted: #737373;
  --color-text-muted-light: #6b7280;
  --color-accent: #14b8a6;
  --color-accent-hover: #0d9488;
  --font-sans: 'Inter', system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-background);
  color: var(--color-text);
  transition: background-color 0.3s, color 0.3s;
}

body.light {
  background-color: var(--color-background-light);
  color: var(--color-text-light);
}
```

**Step 2: Create base layout**

`src/layouts/Layout.astro`:

```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Insu Mun - Software Engineer. Building thoughtful digital experiences with modern web technologies." />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
    <script>
      const theme = localStorage.getItem('theme');
      if (theme === 'light') {
        document.body.classList.add('light');
      }
    </script>
  </body>
</html>
```

**Step 3: Update index.astro with layout**

`src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Insu Mun | Software Engineer">
  <main>
    <p class="text-accent text-center mt-20">Site coming together...</p>
  </main>
</Layout>
```

**Step 4: Create favicon**

`public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#14b8a6"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Inter, sans-serif" font-weight="700" font-size="16">IM</text>
</svg>
```

**Step 5: Build and verify**

```bash
npm run build && npx serve docs
```

Open in browser, verify dark background, teal placeholder text, Inter font loading.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add base layout with global styles and Inter font"
```

---

### Task 3: Navigation Component

**Files:**
- Create: `src/components/Nav.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create Nav component**

`src/components/Nav.astro`:

```astro
<nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
  <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <a href="#" class="text-white font-bold text-xl tracking-tight">IM</a>
    <div class="flex items-center gap-8">
      <a href="#projects" class="text-text-muted hover:text-white transition-colors text-sm">Projects</a>
      <a href="#about" class="text-text-muted hover:text-white transition-colors text-sm">About</a>
      <a href="#contact" class="text-text-muted hover:text-white transition-colors text-sm">Contact</a>
      <button id="theme-toggle" class="text-text-muted hover:text-white transition-colors" aria-label="Toggle theme">
        <svg id="icon-sun" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg id="icon-moon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    </div>
  </div>
</nav>

<script>
  const toggle = document.getElementById('theme-toggle');
  const sun = document.getElementById('icon-sun');
  const moon = document.getElementById('icon-moon');

  function updateIcons() {
    const isLight = document.body.classList.contains('light');
    sun?.classList.toggle('hidden', !isLight);
    moon?.classList.toggle('hidden', isLight);
  }

  toggle?.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateIcons();
  });

  updateIcons();
</script>
```

**Step 2: Add Nav to index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
---

<Layout title="Insu Mun | Software Engineer">
  <Nav />
  <main>
    <p class="text-accent text-center mt-20">Site coming together...</p>
  </main>
</Layout>
```

**Step 3: Build and verify**

```bash
npm run build && npx serve docs
```

Verify: sticky nav, theme toggle works, smooth scroll anchors.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add sticky navigation with dark/light theme toggle"
```

---

### Task 4: Hero Section with Cursor-Reactive Glow

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create Hero component**

`src/components/Hero.astro`:

```astro
<section id="hero" class="relative min-h-screen flex items-center overflow-hidden">
  <div class="absolute inset-0 pointer-events-none" id="hero-glow"></div>

  <div class="relative z-10 max-w-6xl mx-auto px-6 w-full">
    <h1 class="text-6xl md:text-8xl font-bold text-white tracking-tight">
      Insu Mun
    </h1>
    <p class="text-2xl md:text-3xl font-semibold text-accent mt-4">
      Software Engineer
    </p>
    <p class="text-text-muted text-lg mt-4 max-w-xl">
      Building thoughtful digital experiences with modern web technologies.
    </p>

    <div class="flex items-center gap-4 mt-8">
      <a
        href="#projects"
        class="px-6 py-3 bg-accent text-background font-semibold rounded-full hover:bg-accent-hover transition-colors"
      >
        View Projects
      </a>
      <a
        href="/resume.pdf"
        class="px-6 py-3 border border-border text-white rounded-full hover:border-accent hover:text-accent transition-colors"
        target="_blank"
        rel="noopener"
      >
        Resume
      </a>
    </div>

    <div class="flex items-center gap-5 mt-8">
      <a href="https://github.com/mis8680" target="_blank" rel="noopener" class="text-text-muted hover:text-accent transition-colors" aria-label="GitHub">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
      <a href="https://www.linkedin.com/in/insu-eric-mun" target="_blank" rel="noopener" class="text-text-muted hover:text-accent transition-colors" aria-label="LinkedIn">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a href="mailto:hello@example.com" class="text-text-muted hover:text-accent transition-colors" aria-label="Email">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      </a>
    </div>
  </div>
</section>

<script>
  const heroGlow = document.getElementById('hero-glow');
  const hero = document.getElementById('hero');

  hero?.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (heroGlow) {
      heroGlow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(20, 184, 166, 0.15), transparent 40%)`;
    }
  });

  hero?.addEventListener('mouseleave', () => {
    if (heroGlow) {
      heroGlow.style.background = 'transparent';
    }
  });
</script>
```

**Step 2: Add Hero to index.astro**

Replace main content with:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
---

<Layout title="Insu Mun | Software Engineer">
  <Nav />
  <main>
    <Hero />
  </main>
</Layout>
```

**Step 3: Build and verify**

```bash
npm run build && npx serve docs
```

Verify: full-height hero, cursor glow effect, buttons styled, social links work.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add hero section with cursor-reactive teal glow"
```

---

### Task 5: Projects Bento Grid

**Files:**
- Create: `src/components/Projects.astro`
- Create: `src/components/ProjectCard.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create ProjectCard component**

`src/components/ProjectCard.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  featured?: boolean;
}

const { title, description, tags, href = '#', featured = false } = Astro.props;
---

<a
  href={href}
  target="_blank"
  rel="noopener"
  class:list={[
    'group block rounded-2xl border border-border bg-surface p-6 transition-all duration-300',
    'hover:scale-[1.02] hover:border-accent/50 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]',
    { 'md:col-span-2 md:row-span-2 p-8': featured }
  ]}
>
  <h3 class:list={[
    'font-bold text-white',
    featured ? 'text-2xl' : 'text-lg'
  ]}>
    {title}
  </h3>
  <p class:list={[
    'text-text-muted mt-2',
    featured ? 'text-base' : 'text-sm'
  ]}>
    {description}
  </p>
  <div class="flex flex-wrap gap-2 mt-4">
    {tags.map((tag) => (
      <span class="text-xs px-3 py-1 rounded-full border border-accent/30 text-accent">
        {tag}
      </span>
    ))}
  </div>
  <div class="mt-4 text-accent text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
    View Project
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  </div>
</a>
```

**Step 2: Create Projects section**

`src/components/Projects.astro`:

```astro
---
import ProjectCard from './ProjectCard.astro';

const projects = [
  {
    title: 'Project Alpha',
    description: 'A comprehensive full-stack application with real-time data tracking and interactive analytics dashboard.',
    tags: ['React', 'Node.js', 'TypeScript'],
    href: '#',
    featured: true,
  },
  {
    title: 'Project Beta',
    description: 'Modern e-commerce storefront with automated inventory management.',
    tags: ['Vue', 'Express'],
    href: '#',
  },
  {
    title: 'Project Gamma',
    description: 'Social media analytics tool measuring engagement metrics.',
    tags: ['Python', 'Django'],
    href: '#',
  },
  {
    title: 'Project Delta',
    description: 'Mobile task management app for remote teams.',
    tags: ['Swift', 'iOS'],
    href: '#',
  },
  {
    title: 'Project Epsilon',
    description: 'Personal finance tracking interface with data visualizations.',
    tags: ['Next.js', 'Tailwind'],
    href: '#',
  },
];
---

<section id="projects" class="py-24">
  <div class="max-w-6xl mx-auto px-6">
    <h2 class="text-3xl font-bold text-white mb-12">
      Projects
      <span class="block w-12 h-1 bg-accent mt-3 rounded-full"></span>
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard {...project} />
      ))}
    </div>
  </div>
</section>
```

**Step 3: Add Projects to index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Projects from '../components/Projects.astro';
---

<Layout title="Insu Mun | Software Engineer">
  <Nav />
  <main>
    <Hero />
    <Projects />
  </main>
</Layout>
```

**Step 4: Build and verify**

```bash
npm run build && npx serve docs
```

Verify: bento grid layout, featured card larger, hover scale + glow, tech tags styled.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add bento grid projects section with hover effects"
```

---

### Task 6: About Section

**Files:**
- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create About component**

`src/components/About.astro`:

```astro
<section id="about" class="py-24">
  <div class="max-w-6xl mx-auto px-6">
    <h2 class="text-3xl font-bold text-white mb-12">
      About
      <span class="block w-12 h-1 bg-accent mt-3 rounded-full"></span>
    </h2>

    <div class="flex flex-col md:flex-row items-center gap-12">
      <div class="flex-1">
        <p class="text-text-muted text-lg leading-relaxed">
          I am a software engineer who loves creating minimalist and modern web
          experiences that solve real problems. My focus is on blending aesthetic
          design with robust engineering to build products people enjoy using.
        </p>
      </div>

      <div class="shrink-0">
        <div class="w-48 h-48 rounded-full border-2 border-accent/50 overflow-hidden bg-surface flex items-center justify-center">
          <span class="text-text-muted text-sm">Photo</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Add About to index.astro** (after Projects import/usage)

**Step 3: Build and verify**

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add about section with photo placeholder"
```

---

### Task 7: Contact Section + Footer

**Files:**
- Create: `src/components/Contact.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create Contact component**

`src/components/Contact.astro`:

```astro
<section id="contact" class="py-24">
  <div class="max-w-6xl mx-auto px-6 text-center">
    <h2 class="text-3xl font-bold text-white">Let's Connect</h2>
    <p class="text-text-muted mt-4">Have a project in mind? Let's talk.</p>

    <div class="flex justify-center gap-4 mt-8">
      <a
        href="mailto:hello@example.com"
        class="px-8 py-3 border border-accent text-accent rounded-full hover:bg-accent hover:text-background transition-colors font-medium"
      >
        Email
      </a>
      <a
        href="https://github.com/mis8680"
        target="_blank"
        rel="noopener"
        class="px-8 py-3 border border-accent text-accent rounded-full hover:bg-accent hover:text-background transition-colors font-medium"
      >
        GitHub
      </a>
      <a
        href="https://www.linkedin.com/in/insu-eric-mun"
        target="_blank"
        rel="noopener"
        class="px-8 py-3 border border-accent text-accent rounded-full hover:bg-accent hover:text-background transition-colors font-medium"
      >
        LinkedIn
      </a>
    </div>
  </div>
</section>
```

**Step 2: Create Footer component**

`src/components/Footer.astro`:

```astro
<footer class="py-8 border-t border-border">
  <div class="max-w-6xl mx-auto px-6 text-center">
    <p class="text-text-muted text-sm">
      Built with Astro. &copy; {new Date().getFullYear()} Insu Mun.
    </p>
  </div>
</footer>
```

**Step 3: Add both to index.astro**

**Step 4: Build and verify**

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add contact section and footer"
```

---

### Task 8: Scroll Fade-In Animations

**Files:**
- Create: `src/scripts/animations.ts`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/components/Projects.astro`, `About.astro`, `Contact.astro`

**Step 1: Create animation script**

`src/scripts/animations.ts`:

```typescript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
```

**Step 2: Add animation CSS to global.css**

Append to `src/styles/global.css`:

```css
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-up.animate-in {
  opacity: 1;
  transform: translateY(0);
}
```

**Step 3: Add `fade-up` class to section wrappers**

Add `class="fade-up"` to the outer `<div>` inside Projects, About, and Contact sections.

**Step 4: Import animation script in Layout.astro**

Add before closing `</body>`:

```html
<script>
  import '../scripts/animations.ts';
</script>
```

**Step 5: Build and verify**

Scroll down — sections should fade up into view.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add scroll-triggered fade-in animations"
```

---

### Task 9: Light Mode Support

**Files:**
- Modify: `src/styles/global.css`
- Modify: Various components for light mode classes

**Step 1: Add light mode overrides to global.css**

The CSS custom properties already define light variants. Add light-mode class overrides:

```css
body.light {
  background-color: var(--color-background-light);
  color: var(--color-text-light);
}

body.light .bg-surface {
  background-color: var(--color-surface-light);
}

body.light .border-border {
  border-color: var(--color-border-light);
}

body.light .text-text-muted {
  color: var(--color-text-muted-light);
}
```

**Step 2: Test toggle in browser**

Verify all sections look good in both modes.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add light mode support"
```

---

### Task 10: GitHub Actions Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Create GitHub Actions workflow**

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Step 2: Commit**

```bash
git add -A
git commit -m "ci: add GitHub Actions workflow for Pages deployment"
```

---

### Task 11: Final Polish + Responsive Testing

**Step 1: Test on mobile viewport (375px)**

Verify nav collapses nicely, hero text scales, bento grid stacks to single column, about section stacks vertically.

**Step 2: Fix any responsive issues found**

**Step 3: Run Lighthouse audit**

```bash
npx serve docs
# Open Chrome DevTools > Lighthouse > Run audit
```

Target: 90+ on Performance, Accessibility, Best Practices, SEO.

**Step 4: Final commit**

```bash
git add -A
git commit -m "fix: responsive polish and accessibility improvements"
```

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Scaffold Astro + Tailwind |
| 2 | Base layout + global styles |
| 3 | Navigation with theme toggle |
| 4 | Hero with cursor-reactive glow |
| 5 | Projects bento grid |
| 6 | About section |
| 7 | Contact + footer |
| 8 | Scroll fade-in animations |
| 9 | Light mode support |
| 10 | GitHub Actions deployment |
| 11 | Final polish + responsive |
