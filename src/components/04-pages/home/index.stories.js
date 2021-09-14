import * as JumbotronStories from '03-sections/jumbotron/index.stories';
import JumbotronJS from '03-sections/jumbotron/js';
import home from './index.pug';

export default {
  title: 'Pages/Home',
  argTypes: {
    text: { control: 'text' },
    isAccent: { control: 'boolean' },
  },
};

const Template = (props) => {
  JumbotronJS();

  return home({ props });
};

export const Home = Template.bind({});
Home.args = {
  ...JumbotronStories.Jumbotron.args,
};
