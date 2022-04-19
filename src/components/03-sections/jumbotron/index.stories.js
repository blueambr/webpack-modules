import ImgJS from '01-elements/img/js/index';
import pug from './index.pug';
import JumbotronJS from './js';
import data from './data/index.json';
import './styles/index.scss';

export default {
  title: 'Sections/Jumbotron',
  argTypes: {
    sb: { table: { disable: true } },
  },
};

ImgJS();
JumbotronJS();

const Template = (props) => pug({ props });

export const Default = Template.bind({});
Default.args = {
  sb: true,
  ...data,
};
