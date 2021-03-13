const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Helpers
const filesIntoFilenamesArray = (files) => [...files].map((file) => file.replace(/\.[^/.]+$/, ''));
const substringAfterChar = (string, char = '+') => string.substring(string.indexOf(char) + 1);
const substringBeforeChar = (string, char = '+') => string.substring(0, string.indexOf(char));

// Get JS entries array
const entriesFiles = fs.readdirSync(path.resolve(__dirname, 'src/js/entries'));
const entriesFilenames = filesIntoFilenamesArray(entriesFiles);

// Get pages array
const pagesFiles = fs.readdirSync(path.resolve(__dirname, 'src/pages'));
const pagesFilenames = filesIntoFilenamesArray(pagesFiles);

// JS entries array into object
const entries = () => {
  const entriesJSObj = {};

  entriesFilenames.map((entry) => (entriesJSObj[entry] = path.resolve(__dirname, `src/js/entries/${entry}.js`)));

  return entriesJSObj;
};

// Common config
module.exports = {
  entry: entries(),
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    clean: true,
  },
  optimization: {
    moduleIds: 'deterministic',
  },
  module: {
    rules: [
      {
        test: /\.pug$/i,
        loader: 'pug3-loader',
        options: {
          basedir: path.resolve(__dirname, 'src'),
          pretty: true,
          root: path.resolve(__dirname, 'src'),
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    ...pagesFilenames.map(
      (pageFilename) =>
        new HtmlWebpackPlugin({
          // Get page
          template: path.resolve(__dirname, `src/pages/${pageFilename}.pug`),
          /**
           * Use a specified in a page's name JS file, if specified
           * Otherwise use a JS file with the same name as a page
           */
          chunks: [substringAfterChar(pageFilename) || pageFilename],
          // Output
          filename: `../${substringBeforeChar(pageFilename) || pageFilename}.html`,
        })
    ),
    new MiniCssExtractPlugin({
      filename: '../styles/[name].css',
      chunkFilename: '../styles/chunks/[id].css',
    }),
  ],
};
