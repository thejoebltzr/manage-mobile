import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import Dropdown from '@/src/components/dropdown';

export default {
  title: 'components/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const DropdownTemplate: ComponentStory<typeof Dropdown> = args => (
  <Dropdown {...args} />
);

export const DropdownDefault: ComponentStory<typeof Dropdown> =
  DropdownTemplate.bind({});
