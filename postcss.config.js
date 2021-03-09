const fs = require('fs');
const path = require('path');

module.exports = {
  plugins: [require('autoprefixer')],
  plugins: [
    require('postcss-modules')({
      generateScopedName: '[name]__[local]_[hash:base64:5]',
      getJSON: function (cssFileName, json) {
        var jsonFileName = `${path.dirname(cssFileName)}/index.json`;
        fs.writeFileSync(jsonFileName, JSON.stringify(json));
      },
    }),
  ],
};
