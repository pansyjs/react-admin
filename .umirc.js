'use strict';

const path = require('path');
const tsConfigPath = path.join(__dirname, 'tsconfig.json');
const tsConfig = require(tsConfigPath);

// Register TS compilation.
require('ts-node').register({
  project: tsConfigPath
});

require('tsconfig-paths').register({
  baseUrl: path.dirname(tsConfigPath),
  paths: tsConfig.compilerOptions.paths
});

module.exports = require('./config/umi.config');
