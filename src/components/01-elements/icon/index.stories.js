import pug from './index.pug';
import './styles/index.scss';

export default {
  title: 'Elements/Icon',
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
  argTypes: {
    icon: {
      name: 'Icon',
      options: {
        JS: 'js',
        'Node.js': 'node-js',
        React: 'react',
      },
      control: 'radio',
    },
  },
};

const Template = (props) => pug({ props });

export const JS = Template.bind({});
JS.args = {
  icon: 'js',
};

export const Nodejs = Template.bind({});
Nodejs.args = {
  icon: 'node-js',
};

export const React = Template.bind({});
React.args = {
  icon: 'react',
};
