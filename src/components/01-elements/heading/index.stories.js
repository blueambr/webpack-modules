import heading from './index.pug';
import './styles/index.scss';

export default {
  title: 'Elements/Heading',
  argTypes: {
    text: { name: 'Text', control: 'text' },
    tag: { name: 'Tag', options: { 'div h1': 'div h1', h1: 'h1' }, control: 'radio' },
    isColored: { name: 'Colored?', control: 'boolean' },
  },
};

const Template = (props) => heading({ props });

export const Default = Template.bind({});
Default.args = {
  text: 'Heading 1',
  tag: 'h1',
  isColored: false,
};

export const Colored = Template.bind({});
Colored.args = {
  text: 'Colored Heading 1',
  tag: 'h1',
  isColored: true,
};
