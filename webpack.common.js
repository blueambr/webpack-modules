const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Helpers
const filesIntoFilenamesArray = (files) =>
  [...files].map((file) => file.replace(/\.[^/.]+$/, ''));
const substringAfterChar = (string, char = '+') =>
  string.substring(string.indexOf(char) + 1);
const substringBeforeChar = (string, char = '+') =>
  string.substring(0, string.indexOf(char));

// Get JS entries array
const entriesFiles = fs.readdirSync(path.resolve(__dirname, 'src/entries'));

// Get views array
const viewsFiles = fs.readdirSync(path.resolve(__dirname, 'src/views'));
const viewsFilenames = filesIntoFilenamesArray(viewsFiles);

// JS entries array into object
const entries = () => {
  const entriesJSObj = {};

  entriesFiles.map((entry) => {
    const entryFilename = entry.replace(/\.[^/.]+$/, '');

    return (entriesJSObj[entryFilename] = path.resolve(
      __dirname,
      `src/entries/${entry}`
    ));
  });

  return entriesJSObj;
};

// Common config
module.exports = {
  entry: entries(),
  output: {
    path: path.resolve(__dirname, 'dist/js'),
  },
  optimization: {
    moduleIds: 'deterministic',
  },
  module: {
    rules: [
      {
        test: /\.[tj]s[x]?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/i,
        loader: 'storypug/lib/webpack-loader.js',
        options: {
          basedir: path.resolve(__dirname, 'src/components'),
          pretty: true,
          root: path.resolve(__dirname, 'src/components'),
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
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|xml|webmanifest)$/i,
        include: [path.resolve(__dirname, 'src/assets/images')],
        type: 'asset/resource',
        generator: {
          filename: '../assets/images/[name][ext][query]',
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: [path.resolve(__dirname, 'src/components')],
        type: 'asset/resource',
        generator: {
          filename: '../assets/images/[hash][ext][query]',
        },
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: '../assets/fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    ...viewsFilenames.map(
      (viewFilename) =>
        new HtmlWebpackPlugin({
          // Get view
          template: path.resolve(__dirname, `src/views/${viewFilename}.pug`),
          /**
           * Use a specified in a view's name JS file, if specified
           * Otherwise use a JS file with the same name as a view
           */
          chunks: [substringAfterChar(viewFilename) || viewFilename],
          // Output
          filename: `../${
            substringBeforeChar(viewFilename) || viewFilename
          }.html`,
        })
    ),
    new MiniCssExtractPlugin({
      filename: '../styles/[name].css',
      chunkFilename: '../styles/chunks/[id].css',
    }),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'src/components'),
      'node_modules',
    ],
  },
};
