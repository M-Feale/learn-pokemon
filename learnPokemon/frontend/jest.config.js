
// /** @type {import('ts-jest').JestConfigWithTsJest} **/

// export default {
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest",{}],
//   },
//   // transformIgnorePatterns: ["./jest.setup.js"],
//   // preset: "ts-jest",
//   setupFiles: ["./jest.setup.js"]
// };

import { createDefaultPreset } from 'ts-jest'

const jestConfig= {
  preset: "ts-jest",
    transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // setupFiles: ["./jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  ...createDefaultPreset(),
}

export default jestConfig