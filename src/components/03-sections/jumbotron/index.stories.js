import jumbotron from './index.pug';
import JumbotronJS from './js';
import data from './data/index.json';
import './styles/index.scss';

export default {
  title: 'Sections/Jumbotron',
  argTypes: {
    sb: { table: { disable: true } },
    title: { table: { disable: true } },
    iconAlt: { table: { disable: true } },
  },
};

JumbotronJS();

const Template = (props) => jumbotron({ props });

export const Default = Template.bind({});
Default.args = {
  sb: true,
  title: data.title,
  iconAlt: data.iconAlt,
};
