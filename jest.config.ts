import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    'libs/(.*)': '<rootDir>/libs/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/src/main.ts'],
};
export default config;
