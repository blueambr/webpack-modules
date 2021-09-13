import '/src/styles/global/index.scss';
import '/src/styles/index.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Elements', 'Modules', 'Sections', 'Pages'],
      includeName: true,
    },
  },
};
