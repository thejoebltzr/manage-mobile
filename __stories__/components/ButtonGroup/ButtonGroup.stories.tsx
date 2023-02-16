import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import ButtonGroup from '@/src/components/buttonGroup';

export default {
  title: 'components/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    onPress: {action: 'onPress'},
  },
} as ComponentMeta<typeof ButtonGroup>;

const Template: ComponentStory<typeof ButtonGroup> = args => (
  <ButtonGroup {...args} />
);

export const ButtonGroupDefault: ComponentStory<typeof ButtonGroup> =
  Template.bind({});

ButtonGroupDefault.args = {
  buttons: ['ALL', 'NEARBY'],
  selectedIndex: 0,
};
