import pug from './index.pug';
import './styles/index.scss';

export default {
  title: 'Elements/Heading',
  argTypes: {
    text: { name: 'Text', defaultValue: 'Heading', control: 'text' },
    tag: { name: 'Tag', options: { h1: 'h1', h2: 'h2' }, defaultValue: 'h1', control: 'radio' },
    color: {
      name: 'Color',
      options: { Default: 'default', Primary: 'primary' },
      defaultValue: 'default',
      control: 'radio',
    },
  },
};

const Template = (props) => pug({ props });

export const Heading1 = Template.bind({});
Heading1.args = {
  text: 'Heading 1',
};

export const Heading2ColorPrimary = Template.bind({});
Heading2ColorPrimary.args = {
  text: 'Heading 2 Color Primary',
  tag: 'h2',
  color: 'primary',
};
