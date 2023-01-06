const { pathsToModuleNameMapper } = require('ts-jest');

const {
  compilerOptions: { paths = {}, baseUrl = './' }
} = require('./tsconfig.json');
const environment = require('./webpack/environment');

module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  moduleDirectories: ['node_modules', `<rootDir>/${baseUrl}`],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|dayjs/esm|tslib|rxjs|lodash-es/*)'],
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  globals: {
    ...environment
  },
  roots: ['<rootDir>', `<rootDir>/${baseUrl}`],
  modulePaths: [`<rootDir>/${baseUrl}`],
  setupFiles: ['jest-date-mock'],
  cacheDirectory: '<rootDir>/target/jest-cache',
  coverageDirectory: '<rootDir>/target/test-results/',
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: `<rootDir>/${baseUrl}/` }),
  reporters: ['default', ['jest-junit', { outputDirectory: '<rootDir>/target/test-results/', outputName: 'TESTS-results-jest.xml' }]],
  testResultsProcessor: 'jest-sonar-reporter',
  testMatch: ['<rootDir>/src/main/webapp/app/**/@(*.)@(spec.ts)', '<rootDir>/src/main/webapp/@fuse/**/@(*.)@(spec.ts)'],
  testURL: 'http://localhost/'
};
