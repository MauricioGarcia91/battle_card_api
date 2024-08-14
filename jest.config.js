/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}]
  },
  moduleNameMapper: {
    '^@/cards/(.*)$': '<rootDir>/src/cards/$1',
    '^@/card-types/(.*)$': '<rootDir>/src/card-types/$1',
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1'
  }
};
