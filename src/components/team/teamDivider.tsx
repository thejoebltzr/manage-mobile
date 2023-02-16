import {Text} from '@rneui/themed';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface TeamDividerProps {
  name: string;
}

export const TeamDivider = ({name}: TeamDividerProps) => (
  <View style={styles.dividerWrapper}>
    <Text style={styles.dividerText}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  dividerWrapper: {
    height: 60,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    padding: 10,
  },
  dividerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
