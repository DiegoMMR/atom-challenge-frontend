import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const envPath = resolve(process.cwd(), '.env');
const outputPath = resolve(process.cwd(), 'public', 'env.js');

const parseEnv = (raw) => {
  const lines = raw.split(/\r?\n/);
  const entries = {};

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex < 0) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    entries[key] = value;
  }

  return entries;
};

const env = existsSync(envPath) ? parseEnv(readFileSync(envPath, 'utf8')) : {};
const apiBaseUrl = env.API_BASE_URL ?? '';

const output = `window.__env = Object.freeze({ API_BASE_URL: ${JSON.stringify(apiBaseUrl)} });\n`;
writeFileSync(outputPath, output, 'utf8');
