import '/src/styles/global/index.scss';
import '/src/styles/global/swiper.scss';
import '/src/styles/index.scss';

const requireAll = (r) => r.keys().forEach(r);

requireAll(require.context('/src/components/', true, /\.s[ac]ss$/i));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Elements', 'Modules', 'Sections', 'Pages'],
      includeName: true,
    },
  },
};
