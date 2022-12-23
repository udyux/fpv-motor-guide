module.exports = {
  extends: ['stylelint-config-udyux'],
  rules: {
    'color-hex-case': 'lower',
    'scss/at-function-pattern': /^_?[a-zA-Z]*$/,
    'function-name-case': null,
  },
};
