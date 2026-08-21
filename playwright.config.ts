import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  reporter: 'html',
 
  use: {
 baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    headless: true,
    launchOptions: {
      slowMo: 1000, // Hoãn lại 1000ms (1 giây) sau mỗi hành động
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // }
  ],
});
