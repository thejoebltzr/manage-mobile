import {Card} from '@rneui/themed';
import React from 'react';
import {StyleSheet} from 'react-native';

import {Colors} from '@/src/styles';

import Text from '../text';

type ErrorMessageProps = {
  errorMessage: string;
};

const ErrorMessage = ({errorMessage}: ErrorMessageProps) => (
  <Card containerStyle={styles.errorContainer}>
    <Text style={styles.errorTxt}>{errorMessage}</Text>
  </Card>
);

export default ErrorMessage;

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: Colors.warning,
    margin: 0,
    marginTop: 8,
  },
  errorTxt: {
    fontWeight: 'bold',
    color: Colors.white,
  },
});
