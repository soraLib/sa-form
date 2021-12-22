module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript'
  ],
  globals:{
    'CONFIG': true,
    'NodeJS': true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    'semi': [2, 'always'],
    'comma-dangle': [2, 'never'],
    'quotes': ['error', 'single'],
    'space-before-function-paren': ['error', 'never'],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'newline-before-return': 'error',
    'indent': ['error', 2],

    'space-infix-ops': 'error',
    'space-before-blocks': [2, 'always'],
    'space-in-parens': [2, 'never'],
    'no-trailing-spaces': 'error',
    'keyword-spacing': ['error', { 'before': true }],
    'array-bracket-spacing': [2, 'never'],
    'computed-property-spacing': [2, 'never'],
    'arrow-spacing': 'error',

    'vue/no-multiple-template-root': 'off'
  }
};
