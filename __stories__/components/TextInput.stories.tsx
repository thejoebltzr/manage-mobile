import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import TextInput from '@/src/components/textInput/textInput';

export default {
  title: 'components/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const TextInputTemplate: ComponentStory<typeof TextInput> = args => (
  <TextInput {...args} />
);

export const TextInputDefault: ComponentStory<typeof TextInput> =
  TextInputTemplate.bind({});

TextInputDefault.args = {
  placeholder: 'Text here',
};

export const TextInputIcon: ComponentStory<typeof TextInput> =
  TextInputTemplate.bind({});

TextInputIcon.args = {};
