# Portfolio Content And Layout Cleanup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove placeholder-feeling homepage content and fix the desktop projects layout so the section reads cleanly in the browser.

**Architecture:** Keep the existing Astro component structure and update only the homepage content components. Add one lightweight Node test that guards against reintroducing placeholder copy and the broken row-span layout class.

**Tech Stack:** Astro 5, Tailwind CSS 4, Node test runner, npm

---

### Task 1: Add regression coverage for the cleanup

**Files:**
- Create: `tests/portfolio-content-layout.test.mjs`
- Modify: none
- Test: `tests/portfolio-content-layout.test.mjs`

**Step 1: Write the failing test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('projects layout no longer uses featured row span', () => {
  const source = readFileSync(new URL('../src/components/Projects.astro', import.meta.url), 'utf8');
  assert.ok(!source.includes('xl:row-span-2'));
});
```

**Step 2: Run test to verify it fails**

Run: `node --test tests/portfolio-content-layout.test.mjs`
Expected: FAIL because the source still contains the old class and placeholder copy.

**Step 3: Expand the test for copy cleanup**

```js
test('placeholder about copy is removed', () => {
  const source = readFileSync(new URL('../src/components/About.astro', import.meta.url), 'utf8');
  assert.ok(!source.includes('Styled portrait placeholder'));
  assert.ok(!source.includes('Ready for photo'));
});
```

**Step 4: Run test to verify it still fails for the current code**

Run: `node --test tests/portfolio-content-layout.test.mjs`
Expected: FAIL with assertions tied to the current placeholder strings and layout class.

**Step 5: Commit**

```bash
git add tests/portfolio-content-layout.test.mjs
git commit -m "test: cover portfolio content and layout cleanup"
```

### Task 2: Rework the projects section

**Files:**
- Modify: `src/components/Projects.astro`
- Modify: `src/components/ProjectCard.astro`
- Test: `tests/portfolio-content-layout.test.mjs`

**Step 1: Update the section copy and project data**

- Replace fabricated project cards with one real portfolio-build card and two honest supporting focus cards.
- Rewrite the section intro to explain that fuller case studies are still being documented.

**Step 2: Run the targeted test**

Run: `node --test tests/portfolio-content-layout.test.mjs`
Expected: still FAIL until the grid structure and all placeholder strings are corrected.

**Step 3: Change the desktop grid structure**

- Remove the `xl:row-span-2` featured-card layout.
- Use a two-column desktop composition with a stacked supporting column.
- Reduce the featured card minimum height to avoid dead space.

**Step 4: Run the targeted test again**

Run: `node --test tests/portfolio-content-layout.test.mjs`
Expected: PASS for the projects assertions.

**Step 5: Commit**

```bash
git add src/components/Projects.astro src/components/ProjectCard.astro tests/portfolio-content-layout.test.mjs
git commit -m "fix: tighten portfolio projects layout"
```

### Task 3: Remove placeholder language from the about panel

**Files:**
- Modify: `src/components/About.astro`
- Test: `tests/portfolio-content-layout.test.mjs`

**Step 1: Replace the placeholder monogram copy**

- Remove the "Photo" label and other missing-asset wording.
- Keep the orb treatment, but rewrite the panel as an intentional branded profile mark.

**Step 2: Run the targeted test**

Run: `node --test tests/portfolio-content-layout.test.mjs`
Expected: PASS once the placeholder strings are removed.

**Step 3: Review the section for tone consistency**

- Make sure the revised monogram copy still matches the rest of the page voice.

**Step 4: Run the targeted test again**

Run: `node --test tests/portfolio-content-layout.test.mjs`
Expected: PASS with no placeholder-copy failures.

**Step 5: Commit**

```bash
git add src/components/About.astro tests/portfolio-content-layout.test.mjs
git commit -m "fix: remove about section placeholder copy"
```

### Task 4: Verify the site end to end

**Files:**
- Modify: none
- Test: `tests/portfolio-content-layout.test.mjs`

**Step 1: Run the targeted regression test**

Run: `node --test tests/portfolio-content-layout.test.mjs`
Expected: PASS

**Step 2: Run project checks**

Run: `npm run check`
Expected: PASS

**Step 3: Run the production build**

Run: `npm run build`
Expected: PASS and regenerate `docs/`

**Step 4: Verify in browser**

Run: browser screenshot against `http://127.0.0.1:4321/#projects`
Expected: featured card no longer towers over a compressed right column; placeholder wording removed.

**Step 5: Commit**

```bash
git add docs src tests
git commit -m "fix: clean up homepage content and layout"
```
