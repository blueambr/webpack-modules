import pug from './index.pug';
import ImgJS from './js';
import './styles/index.scss';

export default {
  title: 'Elements/Image',
};

ImgJS();

const Template = (props) => pug({ props });

export const Image = Template.bind({});
Image.args = {
  componentFolder: '01-elements',
  component: 'img',
  src600: '600.png',
  alt: 'Webpack logo',
};
