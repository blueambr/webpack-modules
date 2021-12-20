import title from './index.pug';
import './styles/index.scss';

export default {
  title: 'Elements/Title',
  argTypes: {
    text: { name: 'Title', control: 'text' },
    tag: { name: 'Tag', options: { div: 'div', h1: 'h1', h2: 'h2' }, control: 'radio' },
    isColored: { name: 'Colored?', control: 'boolean' },
  },
};

const Template = (props) => title({ props });

export const Default = Template.bind({});
Default.args = {
  text: 'Title',
  tag: 'h1',
  isColored: false,
};

export const Colored = Template.bind({});
Colored.args = {
  text: 'Colored Title',
  tag: 'h1',
  isColored: true,
};
