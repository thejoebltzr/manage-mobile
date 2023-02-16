import {Input as RNEInput} from '@rneui/themed';
import {InputProps as RNEInputProps} from '@rneui/themed';
import React from 'react';

export interface InputProps extends RNEInputProps {}

const TextInput = (args: InputProps) => {
  return <RNEInput {...args} />;
};

export default TextInput;
