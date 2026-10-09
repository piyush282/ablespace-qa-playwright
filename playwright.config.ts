import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL,
    channel: 'chrome',
    headless: false,
    storageState: fs.existsSync('auth.json') ? 'auth.json' : undefined,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});