import {ComponentStory} from '@storybook/react';
import {ComponentMeta} from '@storybook/react-native';
import React from 'react';

import Icon from '@/src/components/icon';

export default {
  title: 'components/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const IconTemplate: ComponentStory<typeof Icon> = args => <Icon {...args} />;

export const IconDefault: ComponentStory<typeof Icon> = IconTemplate.bind({});

IconDefault.args = {
  name: 'heartbeat',
  type: 'font-awesome',
};
