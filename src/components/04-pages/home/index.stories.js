import JumbotronJS from '03-sections/jumbotron/js/index';
import SliderJS from '03-sections/slider/js/index';
import home from './index.pug';

export default {
  title: 'Pages/Home',
};

JumbotronJS();
SliderJS();

const Template = (props) => home({ props });

export const Home = Template.bind({});
Home.args = {};
