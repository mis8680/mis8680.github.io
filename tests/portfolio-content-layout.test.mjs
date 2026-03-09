import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const projectsSource = readFileSync(new URL('../src/components/Projects.astro', import.meta.url), 'utf8');
const aboutSource = readFileSync(new URL('../src/components/About.astro', import.meta.url), 'utf8');

test('projects section drops the oversized featured row span', () => {
	assert.equal(projectsSource.includes('xl:row-span-2'), false);
});

test('projects section removes fabricated placeholder project titles', () => {
	assert.equal(projectsSource.includes('Campus Event Toolkit'), false);
	assert.equal(projectsSource.includes('Creator Metrics Snapshot'), false);
	assert.equal(projectsSource.includes('Component Lab'), false);
	assert.equal(projectsSource.includes('Research Threads'), false);
});

test('about section removes missing-asset placeholder language', () => {
	assert.equal(aboutSource.includes('Styled portrait placeholder'), false);
	assert.equal(aboutSource.includes('Ready for photo'), false);
});
