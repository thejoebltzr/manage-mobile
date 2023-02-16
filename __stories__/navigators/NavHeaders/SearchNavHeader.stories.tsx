import {NavigationContainer} from '@react-navigation/native';
import {ComponentMeta, ComponentStory} from '@storybook/react-native';
import React from 'react';

import ButtonGroup from '@/src/components/buttonGroup';
import {SearchNavHeader} from '@/src/components/navigation/navHeaders';
import {BackButton} from '@/src/components/navigation/navItems';

export default {
  title: 'navigators/NavHeaders/SchoolNavHeader',
  component: SearchNavHeader,
  decorators: [
    Story => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
  argTypes: {onSearch: {action: 'onSearch'}},
} as ComponentMeta<typeof SearchNavHeader>;

const Template: ComponentStory<typeof SearchNavHeader> = args => (
  <SearchNavHeader {...args} />
);

export const Header: ComponentStory<typeof SearchNavHeader> = Template.bind({});
Header.args = {
  leftButton: <BackButton color="#fff" />,
  children: <ButtonGroup buttons={['ALL', 'NEARBY']} selectedIndex={0} />,
};
