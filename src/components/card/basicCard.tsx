import React from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS} from '@/src/theme/colors';

import Text from '../text';

interface BasicCardProps {
  errorText?: string;
}

const BasicCard = ({errorText}: BasicCardProps) => (
  <View style={styles.content}>
    <Text style={styles.notFound}>{errorText || ''}</Text>
  </View>
);

const styles = StyleSheet.create({
  skeletonContainer: {flex: 1, flexDirection: 'column', padding: 5},
  skeleton: {height: 80, marginBottom: 5},
  content: {
    padding: 20,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowRadius: 1.41,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  notFound: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BasicCard;
