module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],

  env: {
    node: true,
    es6: true,
    serviceworker: true,
    browser: true,
  },
  globals: {
    workbox: false,
    document: true,
    window: true,
    firebase: true,
    jQuery: true,
    $: true,
    FB: true,
    hljs: true,
    Popper: true,
    Tooltip: true,
  },

  rules: {
    //"security/detect-non-literal-require": 0,
    'prettier/prettier': 'error',
    'prefer-const': 0,
    // Typescript rules
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-shadow': 1,
  },
};
