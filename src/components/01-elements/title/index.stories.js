import title from './index.pug';
import './styles/index.scss';

export default {
  title: 'Elements/Title',
  argTypes: {
    text: { name: 'Title', control: 'text' },
    isColored: { name: 'Colored?', control: 'boolean' },
  },
};

const Template = (props) => title({ props });

export const Jumbotron = Template.bind({});
Jumbotron.args = {
  text: 'Webpack Modules',
  isColored: false,
};

export const Colored = Template.bind({});
Colored.args = {
  text: 'Colored Title',
  isColored: true,
};
