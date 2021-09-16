import slider from './index.pug';
import data from './data/index.json';
import SliderJS from './js';
import './styles/index.scss';

export default {
  title: 'Sections/Slider',
};

SliderJS();

const Template = (props) => slider({ props });

export const Slider = Template.bind({});
Slider.args = data;
