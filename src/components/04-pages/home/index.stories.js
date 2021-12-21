import ImgJS from '01-elements/img/js/index';
import JumbotronJS from '03-sections/jumbotron/js/index';
import SliderJS from '03-sections/slider/js/index';
import home from './index.pug';

export default {
  title: 'Pages/Home',
};

ImgJS();
JumbotronJS();
SliderJS();

const Template = (props) => home({ props });

export const Home = Template.bind({});
Home.args = {};
Home.parameters = {
  controls: { hideNoControlsWarning: true },
};
