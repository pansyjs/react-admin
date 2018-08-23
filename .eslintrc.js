module.exports = {
  parser: 'typescript-eslint-parser',
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  plugins: [
    'typescript',
    'react'
  ],
  rules: {
    'eqeqeq': [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],
    'typescript/class-name-casing': 'error'
  }
};
