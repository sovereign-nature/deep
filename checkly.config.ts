import { defineConfig } from 'checkly';
import { Frequency } from 'checkly/constructs';

export default defineConfig({
  projectName: 'DEEP',
  logicalId: 'deep-monitoring',
  repoUrl: 'https://github.com/sovereign-nature/deep',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2022.10',
    frequency: Frequency.EVERY_15M,
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['website', 'api'],
    checkMatch: '**/__checks__/**/*.check.ts',
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: Frequency.EVERY_15M,
      testMatch: '**/__checks__/**/*.spec.ts',
    },
  },
  cli: {
    runLocation: 'eu-west-1',
  },
});
