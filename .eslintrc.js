module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { args: 'after-used', ignoreRestSiblings: true, destructuredArrayIgnorePattern: '^_' },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? ['warn', { allow: ['warn', 'error'] }] : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/next-tick-style': 'warn',
    'vue/padding-line-between-blocks': 'warn',
    'vue/prefer-true-attribute-shorthand': 'warn',
  },
};
