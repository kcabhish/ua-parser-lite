/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",             // Use ts-jest to handle TypeScript
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],  // Ensure this matches your test files
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text-summary"],
  transform: {
    "^.+\\.ts$": "ts-jest"       // Correct format for TypeScript files
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  coveragePathIgnorePatterns: ["/tests/", "/node_modules/"], // Ignore tests
};
