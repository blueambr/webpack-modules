const path = require('path');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    port: 3000,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
  },
  output: {
    filename: '[name].bundle.js',
  },
  optimization: {
    removeEmptyChunks: false,
    runtimeChunk: 'single',
    splitChunks: false,
  },
  target: 'web',
  plugins: [
    new ESLintPlugin({
      exclude: ['dist', 'node_modules'],
      fix: true,
    }),
    new StylelintPlugin({
      configFile: '.stylelintrc',
      files: 'src/**/*.(s(a|c)ss|css)',
      fix: true,
    }),
  ],
  stats: 'errors-warnings',
});
