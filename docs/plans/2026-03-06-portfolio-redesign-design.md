# Portfolio Redesign - Design Document

## Overview
Rebuild mis8680.github.io as a modern single-page portfolio using Astro + Tailwind CSS, deployed to GitHub Pages.

## Tech Stack
- **Framework:** Astro (static output)
- **Styling:** Tailwind CSS
- **Hosting:** GitHub Pages (existing repo)
- **Domain:** mis8680.github.io (no custom domain currently)

## Design
- **Style:** Dark editorial with cursor-reactive background + bento grid projects
- **Background:** Dark charcoal (#0a0a0a)
- **Text:** Off-white (#e5e5e5), pure white headings
- **Accent:** Teal (#14b8a6)
- **Font:** Inter (single family, hierarchy via size/weight)
- **Dark mode default**, light mode toggle

## Sections

### 1. Navigation (sticky)
- "IM" logo left, section anchors right (Projects, About, Contact)
- Dark/light mode toggle icon

### 2. Hero (full viewport)
- "Insu Mun" large bold heading
- "Software Engineer" in teal
- Tagline in muted gray
- CTA buttons: "View Projects" (scroll anchor), "Resume" (PDF link)
- Social icons: GitHub (mis8680), LinkedIn (insu-eric-mun), Email
- **Cursor-reactive teal gradient glow** on background

### 3. Projects (Bento Grid)
- Asymmetric grid: 1 featured large card + 4 smaller cards
- Each card: project name, description, tech tags, "View Project" link
- Dark elevated cards (#141414) with subtle border
- Hover: slight scale (1.02x) + teal glow
- Placeholder content (user will replace later)

### 4. About
- Brief 2-3 sentence bio (left) + circular photo placeholder (right)
- Teal border ring on photo

### 5. Contact ("Let's Connect")
- Centered heading + subtext
- Three button links: Email, GitHub, LinkedIn
- Teal border buttons, fill on hover

### 6. Footer
- "Built with Astro. (c) 2026 Insu Mun."

## Interactive Details
- Cursor-reactive gradient glow (hero)
- Bento card hover effects (scale + glow)
- Scroll-triggered fade-in animations (CSS/minimal JS)
- Smooth scroll navigation

## Reference
- Stitch mockups approved by user (3 screens: hero, projects, about/contact)
- Inspired by brittanychiang.com style
