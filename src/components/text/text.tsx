import {Text as RNEText, TextProps as RNETextProps} from '@rneui/themed';
import React from 'react';

export interface TextProps extends RNETextProps {}

const Text = (args: TextProps) => {
  return <RNEText {...args} />;
};

export default Text;
