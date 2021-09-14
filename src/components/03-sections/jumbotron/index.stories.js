import * as TitleStories from '01-elements/title/index.stories';
import jumbotron from './index.pug';
import JumbotronJS from './js';
import './styles/index.scss';

export default {
  title: 'Sections/Jumbotron',
  argTypes: {
    text: { control: 'text' },
    isAccent: { control: 'boolean' },
  },
};

const Template = (props) => {
  JumbotronJS();

  return jumbotron({ props });
};

export const Jumbotron = Template.bind({});
Jumbotron.args = {
  ...TitleStories.Jumbotron.args,
};
