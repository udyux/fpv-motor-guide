/* eslint-env node */
module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeUselessDefs: false,
          removeHiddenElems: false,
          removeViewBox: false,
          cleanupIds: false,
        },
      },
    },
    'convertStyleToAttrs',
    'sortAttrs',
    'removeDimensions',
    {
      name: 'removeAttrs',
      params: { attrs: '(stroke)' },
    },
  ],
};
