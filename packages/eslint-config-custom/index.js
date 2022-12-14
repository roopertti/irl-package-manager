module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true
  },
  globals: {
    'jest/globals': true,
  },
  extends: [
    'standard',
    'turbo',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'jest'
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
  }
}
