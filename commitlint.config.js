const types = [
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test'
];

module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'subject-case': [0, 'never', ['lower-case']],
    'type-enum': [2, 'always', types]
  }
};
