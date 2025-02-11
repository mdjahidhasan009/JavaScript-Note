/*
 * File: eslint.config.mjs
 * Responsibility: This file contains the custom configuration for ESLint. It is used to configure ESLint to work with the project. We used eslint version 9.14.0 which is used the flat configuration format.

 * Author: Rasel Hossain
 * Created: 2024-11-10
 * Version: 1.0.1

 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});


//--------
/*
 * File: eslint.config.mjs
 * Responsibility: ESLint configuration for the Express.js application
 */

import { fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import baseConfig from '../../eslint.config.mjs';

const recommendedConfig = fixupConfigRules(
  compat.extends(
    "@repo/eslint-config/base.js"
  )
);
const expressAppConfig = {
  plugins: {
    '@typescript-eslint': fixupPluginRules(typescriptEslint),
  },

  files: ['src/**/*.ts'],

  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    parser: tsParser,
    ecmaVersion: 2023,
    sourceType: 'module',
    parserOptions: {
      project: './tsconfig.json',
    },
  },

  rules: {
    'prefer-const': 'warn',
    'no-var': 'warn',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'max-params': ['warn', 5],
    'no-param-reassign': 'warn',
    'object-shorthand': 'warn',
    'quote-props': ['warn', 'as-needed'],
    'no-restricted-imports': ['error'],
    'no-duplicate-imports': 'error',

    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^(_.*|.*Type)$',
        varsIgnorePattern: '^(_.*|.*Type)$',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/array-type': ['warn', { default: 'array' }],
  },
};

export default [
  ...baseConfig,
  {
    ignores: ['node_modules/', '.git/', 'dist/', 'coverage/'],
  },
  ...recommendedConfig,
  expressAppConfig,
];