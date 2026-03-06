import { spawn } from 'node:child_process';
import { access, mkdir, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = path.join(rootDir, 'docs');
const plansDir = path.join(docsDir, 'plans');
const backupRoot = path.join(rootDir, '.astro', 'docs-backup');
const backupPlansDir = path.join(backupRoot, 'plans');
const astroBin = path.join(
  rootDir,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'astro.cmd' : 'astro'
);

async function pathExists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function clearBackup() {
  await rm(backupRoot, { recursive: true, force: true });
}

async function backupPlans() {
  if (!(await pathExists(plansDir))) {
    return;
  }

  await clearBackup();
  await mkdir(path.dirname(backupPlansDir), { recursive: true });
  await rename(plansDir, backupPlansDir);
}

async function restorePlans() {
  if (!(await pathExists(backupPlansDir))) {
    return;
  }

  await mkdir(docsDir, { recursive: true });
  await rm(plansDir, { recursive: true, force: true });
  await rename(backupPlansDir, plansDir);
  await clearBackup();
}

function runAstroBuild() {
  return new Promise((resolve, reject) => {
    const child = spawn(astroBin, ['build'], {
      cwd: rootDir,
      stdio: 'inherit'
    });

    child.on('error', reject);
    child.on('exit', (code, signal) => {
      if (signal) {
        reject(new Error(`astro build terminated with signal ${signal}`));
        return;
      }

      resolve(code ?? 1);
    });
  });
}

let exitCode = 1;

try {
  await backupPlans();
  exitCode = await runAstroBuild();
} finally {
  await restorePlans();
}

if (exitCode !== 0) {
  process.exit(exitCode);
}
