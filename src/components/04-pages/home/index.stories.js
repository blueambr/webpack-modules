import * as JumbotronStories from '03-sections/jumbotron/index.stories';
import * as SliderStories from '03-sections/slider/index.stories';
import home from './index.pug';

export default {
  title: 'Pages/Home',
  argTypes: {
    text: { name: 'Title', control: 'text' },
    isColored: { name: 'Colored Title?', control: 'boolean' },
  },
};

const Template = (props) => home({ props });

export const Home = Template.bind({});
Home.args = {
  ...JumbotronStories.Jumbotron.args,
  ...SliderStories.Slider.args,
};
