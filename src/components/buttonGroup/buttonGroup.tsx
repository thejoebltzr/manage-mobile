import {ButtonGroup as RNEButtonGroup, ButtonGroupProps} from '@rneui/themed';
import React from 'react';
import {StyleSheet} from 'react-native';

const ButtonGroup = (args: ButtonGroupProps) => (
  <RNEButtonGroup
    containerStyle={styles.containerStyle}
    selectedButtonStyle={styles.selectedButtonStyle}
    selectedTextStyle={styles.selectedTextStyle}
    buttonStyle={styles.buttonStyle}
    textStyle={styles.textStyle}
    {...args}
  />
);

const styles = StyleSheet.create({
  containerStyle: {
    padding: 2,
    borderRadius: 0,
    backgroundColor: '#2563EB',
    borderColor: '#2563eb',
  },
  selectedButtonStyle: {
    backgroundColor: '#fff',
  },
  selectedTextStyle: {
    color: '#000',
  },
  buttonStyle: {
    backgroundColor: '#2563EB',
  },
  textStyle: {
    color: '#fff',
  },
});

export default ButtonGroup;
