import jumbotron from './index.pug';
import JumbotronJS from './js';
import './styles/index.scss';

export default {
  title: 'Sections/Jumbotron',
};

export const Jumbotron = () => {
  JumbotronJS();

  return jumbotron();
};
