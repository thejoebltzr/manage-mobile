import {NavigationContainer} from '@react-navigation/native';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import SideBar from '@/src/components/navigation/sideBar';

export default {
  title: 'navigators/SideBar',
  component: SideBar,
  decorators: [
    Story => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = args => <SideBar {...args} />;

export const SideBarDefault: ComponentStory<typeof SideBar> = Template.bind({});
