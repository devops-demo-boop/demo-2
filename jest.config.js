module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.js', '!src/server.js'],
  coverageReporters: ['text', 'text-summary'],
  coverageThreshold: {global: {branches: 80, lines: 85}},
};
