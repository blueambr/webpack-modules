import pug from './index.pug';
import SliderJS from './js';
import data from './data/index.json';
import './styles/index.scss';

export default {
  title: 'Sections/Slider',
  argTypes: {
    sb: { table: { disable: true } },
  },
};

SliderJS();

const Template = (props) => pug({ props });

export const Default = Template.bind({});
Default.args = {
  sb: true,
  ...data,
};
