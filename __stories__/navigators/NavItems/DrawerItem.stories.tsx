// stories/MyButton.stories.tsx
import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {DrawerItem} from '@/src/components/navigation/navItems';

export default {
  title: 'navigators/DrawerItem',
  component: DrawerItem,
  argTypes: {onPress: {action: 'onPress'}},
} as ComponentMeta<typeof DrawerItem>;

const Template: ComponentStory<typeof DrawerItem> = args => (
  <DrawerItem {...args} />
);

export const HomeItem: ComponentStory<typeof DrawerItem> = Template.bind({});

HomeItem.args = {
  title: 'Home',
  icon: 'home',
};

export const SchoolItem: ComponentStory<typeof DrawerItem> = Template.bind({});

SchoolItem.args = {
  title: 'School',
  icon: 'school',
};
