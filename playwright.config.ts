import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "html",
  use: {
    baseURL: process.env.CI ? process.env.BASE_URL : "https://localhost",
    ignoreHTTPSErrors: true,
    trace: "on-first-retry",
  },

  // Configure projects for major browsers
  projects: [
    {
      name: "Google Chrome",
      use: {
        channel: "chrome",
      },
    },
  ],
});
