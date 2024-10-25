module.exports = {
  // Use ts-jest preset for testing TypeScript files with Jest
  preset: "ts-jest",
  // Set the test environment to Node.js
  testEnvironment: "node",

  // Use ts-jest to transform TypeScript files
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Regular expression to find test files
  testRegex: "((\\.|/)(test|spec))\\.tsx?$",

  // File extensions to recognize in module resolution
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Always collect coverage information
  collectCoverage: true,


  // Collect coverage information form all the files in the directory ending with .ts extension
  collectCoverageFrom: [
    "**/*.ts",
  ]
};
