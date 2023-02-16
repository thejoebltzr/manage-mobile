import {
  Switch as RNESwitch,
  SwitchProps as RNESwitchProps,
} from '@rneui/themed';
import React from 'react';

export interface SwitchProps extends RNESwitchProps {}

const Switch = (args: SwitchProps) => {
  return <RNESwitch {...args} />;
};

export default Switch;
