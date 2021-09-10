const { merge } = require('webpack-merge');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].bundle.js',
  },
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => `runtime.${entrypoint.name}`,
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        /**
         * Lossy optimization
         * Feel free to experiment with options to achieve the best result in your case
         *
         * If you use WebP — comment out 'mozjpeg' and 'pngquant' plugins and vice versa
         */
        plugins: [
          ['gifsicle', { interlaced: true, optimizationLevel: 3 }],
          // ['mozjpeg', { quality: 30 }],
          // ['pngquant', { quality: [0.3, 0.3] }],
          [
            'svgo',
            {
              plugins: [
                {
                  name: 'preset-default',
                  overrides: {
                    removeUselessDefs: false,
                    removeViewBox: false,
                  },
                },
              ],
            },
          ],
          ['webp', { quality: 30 }],
        ],
      },
    }),
  ],
});
