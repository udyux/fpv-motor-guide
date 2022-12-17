module.exports = {
  extends: ['stylelint-config-udyux'],
  ignoreFiles: ['dist/**', '**/vendors/**', 'LICENSE'],
  rules: {
    'color-hex-case': 'lower',
    'scss/at-function-pattern': /^_?[a-zA-Z]*$/,
    'function-name-case': null,
  },
};
