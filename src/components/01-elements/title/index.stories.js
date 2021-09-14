import title from './index.pug';
import './styles/index.scss';

export default {
  title: 'Elements/Title',
  argTypes: {
    text: { control: 'text' },
    isAccent: { control: 'boolean' },
  },
};

const Template = (props) => title({ props });

export const Jumbotron = Template.bind({});
Jumbotron.args = {
  text: 'Webpack Modules',
  isAccent: false,
};

export const Accent = Template.bind({});
Accent.args = {
  text: 'Accent',
  isAccent: true,
};
