module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov'],
  roots: ['test'],
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: ['src/**/*.(t|j)s', '!src/*.d.ts', '!src/main.ts'],
};
