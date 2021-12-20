const path = require('path');

module.exports = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: 'storypug',
      options: {
        loaderOptions: {
          basedir: path.resolve(__dirname, '../src/components'),
          pretty: true,
          root: path.resolve(__dirname, '../src/components'),
        },
      },
    },
  ],
  core: {
    builder: 'webpack5',
  },
  features: {
    storyStoreV7: true,
  },
  framework: '@storybook/html',
  staticDirs: ['../src'],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    });
    config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, '../src/components')];

    return config;
  },
};
