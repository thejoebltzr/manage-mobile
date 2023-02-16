import {Icon, Text} from '@rneui/themed';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Button from '@/src/components/button';
import Divider from '@/src/components/divider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default {
  title: 'components/Divider',
  component: Divider,
  decorators: [
    Story => (
      <SafeAreaProvider style={styles.container}>
        <Story />
      </SafeAreaProvider>
    ),
  ],
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = args => <Divider {...args} />;

export const DividerDefault: ComponentStory<typeof Divider> = Template.bind({});
DividerDefault.args = {
  children: <Text>Default Text</Text>,
};

export const DividerIcon: ComponentStory<typeof Divider> = Template.bind({});
DividerIcon.args = {
  children: <Icon name="home" />,
};

export const DividerButton: ComponentStory<typeof Divider> = Template.bind({});
DividerButton.args = {
  children: <Button title="Button" rounded={true} />,
};
