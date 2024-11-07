module.exports = {
  testMatch: ["<rootDir>/src/**/*.test.{js,jsx,ts,tsx}"],
  coverageProvider: "v8",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
  ],
  moduleNameMapper: {
    // Handle image imports
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$":
      "<rootDir>/__mocks__/fileMock.js",

    // Handle module aliases
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
