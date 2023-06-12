import ButtonGroup from './ButtonGroup';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Wanted/MyButton',
  component: ButtonGroup,
  tags: ['autodocs'],
};

export const DefaultGroup = {
  args: {
    primary: true,
    label: 'Button',
  },
};