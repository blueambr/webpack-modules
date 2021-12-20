import slider from './index.pug';
import SliderJS from './js';
import data from './data/index.json';
import './styles/index.scss';

export default {
  title: 'Sections/Slider',
  argTypes: {
    sb: { table: { disable: true } },
    slides: { table: { disable: true } },
  },
};

SliderJS();

const Template = (props) => slider({ props });

export const Default = Template.bind({});
Default.args = {
  sb: true,
  slides: data.slides,
};
