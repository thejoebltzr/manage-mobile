import {Button as RNEButton} from '@rneui/themed';
import {ButtonProps as RNEButtonProps} from '@rneui/themed';
import React from 'react';
import {StyleSheet} from 'react-native';

import {COLORS} from '@/src/theme/colors';

export interface ButtonProps extends RNEButtonProps {
  rounded?: boolean;
}

const Button = (args: ButtonProps) => {
  const {rounded} = args;
  return (
    <RNEButton
      color={COLORS.PRIMARY}
      radius={rounded ? 999 : 0}
      {...args}
      disabledStyle={styles.disabled}
    />
  );
};

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: COLORS.PRIMARY,
  },
});

export default Button;
