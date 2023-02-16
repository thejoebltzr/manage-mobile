// stories/MyButton.stories.tsx
import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Button from '@/src/components/button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default {
  title: 'components/Button',
  component: Button,
  decorators: [
    Story => (
      <SafeAreaProvider style={styles.container}>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {onPress: {action: 'onPress'}},
} as ComponentMeta<typeof Button>;

const ButtonTemplate: ComponentStory<typeof Button> = args => (
  <Button {...args} />
);

export const ButtonDefault: ComponentStory<typeof Button> = ButtonTemplate.bind(
  {},
);

ButtonDefault.args = {
  title: 'Button',
};

export const ButtonRounded: ComponentStory<typeof Button> = ButtonTemplate.bind(
  {},
);

ButtonRounded.args = {
  title: 'Button',
  rounded: true,
};

export const ButtonIcon: ComponentStory<typeof Button> = ButtonTemplate.bind(
  {},
);

ButtonIcon.args = {
  title: 'Button',
  icon: {
    name: 'home',
    type: 'feather',
    size: 15,
    color: 'white',
  },
  iconContainerStyle: {
    marginRight: 10,
  },
};

export const ButtonSmall: ComponentStory<typeof Button> = ButtonTemplate.bind(
  {},
);

ButtonSmall.args = {
  title: 'Button',
  size: 'sm',
};

export const ButtonMedium: ComponentStory<typeof Button> = ButtonTemplate.bind(
  {},
);

ButtonMedium.args = {
  title: 'Button',
  size: 'md',
};

export const ButtonLarge: ComponentStory<typeof Button> = ButtonTemplate.bind(
  {},
);

ButtonLarge.args = {
  title: 'Button',
  size: 'lg',
};

export const ButtonDisabled: ComponentStory<typeof Button> =
  ButtonTemplate.bind({});

ButtonDisabled.args = {
  title: 'Button',
  disabled: true,
};
