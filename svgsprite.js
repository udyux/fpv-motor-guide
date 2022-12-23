/* eslint-env node */
const { resolve } = require('path');
const fs = require('fs-extra');
const svgStore = require('svgstore');
const { optimize, loadConfig } = require('svgo');

const src = resolve(__dirname, 'src/assets/icons');
const dest = resolve(__dirname, 'public/icons.svg');

const addIcons = (files, sprite) => {
  files.forEach(({ id, path }) => sprite.add(id, fs.readFileSync(path, 'utf8')));
  return Promise.resolve();
};

fs.readdir(src)
  .then(files =>
    files
      .filter(file => /\.svg$/.test(file))
      .map(file => ({
        id: file.replace(/\.svg$/, ''),
        path: resolve(src, file),
      }))
  )
  .then(files => {
    const n = files.length;

    const sprite = svgStore({
      cleanDefs: true,
      cleanSymbols: true,
      svgAttrs: { style: 'display:none' },
    });

    addIcons(files, sprite)
      .then(loadConfig)
      .then(config => optimize(sprite.toString(), { ...config, path: dest }))
      .then(({ data }) => fs.outputFile(dest, data))
      .then(() => console.log(`Successfully compiled ${n} icon${n > 1 ? 's' : ''}`))
      .catch(err => {
        throw err;
      });
  });
