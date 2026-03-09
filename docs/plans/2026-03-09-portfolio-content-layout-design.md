# Portfolio Content And Layout Cleanup Design

## Overview
Tighten the homepage so it reads like a deliberate portfolio instead of a partially populated template. The cleanup focuses on the projects grid and the about section, where placeholder language and uneven layout currently break the illusion of finished work.

## Goals
- Reduce the projects section to a smaller, more honest set of cards.
- Remove the oversized featured-card layout that creates empty space on desktop.
- Replace missing-asset language in the about section with intentional branded copy.
- Preserve the existing visual system, motion tone, and section ordering.

## Content Direction
- Reframe the projects area as a compact snapshot rather than a broad case-study archive.
- Keep one concrete lead item for the portfolio build itself.
- Use two supporting cards as honest practice-area threads instead of fabricated project case studies.
- Remove explicit placeholder phrases such as "Styled portrait placeholder" and "Ready for photo."

## Layout Direction
- Replace the current asymmetric row-span grid with a two-column desktop layout: one featured card on the left and a stacked pair of supporting cards on the right.
- Keep the mobile and tablet experience as a single-column or balanced two-column stack without forcing equal heights through row spanning.
- Slightly reduce the featured card minimum height so the section remains dense and editorial.

## Verification
- Add a targeted regression test that checks for the removal of placeholder copy and the row-span class.
- Run `npm run check` and `npm run build`.
- Re-test the projects section in the browser with a desktop screenshot.
