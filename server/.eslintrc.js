export default {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    es2021: true,
    node: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'development' ? 'warn' : 'error',
    'no-unused-vars': process.env.NODE_ENV === 'development' ? 'warn' : 'error',
  },
};
