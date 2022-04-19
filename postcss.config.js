/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-modules')({
      generateScopedName: '[name]__[local]_[hash:base64:5]',
      getJSON: (cssFileName, json) => {
        const cssName = path.basename(cssFileName, '.scss');
        const jsonFileName = `${path.dirname(cssFileName)}/${cssName}.json`;
        fs.writeFileSync(jsonFileName, JSON.stringify(json));
      },
      globalModulePaths: [/node_modules/, process.platform === 'win32' ? /src\\styles/ : /src\/styles/],
    }),
  ],
};
