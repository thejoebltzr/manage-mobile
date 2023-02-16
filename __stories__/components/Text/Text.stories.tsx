import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import Text from '@/src/components/text';

export default {
  title: 'components/Text',
  component: Text,
} as ComponentMeta<typeof Text>;

const TextTemplate: ComponentStory<typeof Text> = args => (
  <Text {...args}>Hello</Text>
);

export const TextDefault: ComponentStory<typeof Text> = TextTemplate.bind({});

TextDefault.args = {};

export const TextH1: ComponentStory<typeof Text> = TextTemplate.bind({});

TextH1.args = {
  h1: true,
};

export const TextH2: ComponentStory<typeof Text> = TextTemplate.bind({});

TextH2.args = {
  h2: true,
};

export const TextH3: ComponentStory<typeof Text> = TextTemplate.bind({});

TextH3.args = {
  h3: true,
};

export const TextH4: ComponentStory<typeof Text> = TextTemplate.bind({});

TextH4.args = {
  h4: true,
};
