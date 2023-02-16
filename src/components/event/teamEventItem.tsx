import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {COLORS} from '@/src/theme/colors';
import {GST} from '@/src/theme/globalStyles';

import Icon from '../icon';
import Text from '../text';

interface TeamEventItemProps {
  name: string;
  backgroundColor?: string;
  onPress?: () => void;
}

export const TeamEventItem = memo(
  ({name, backgroundColor, onPress}: TeamEventItemProps) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            ...styles.container,
            backgroundColor: backgroundColor || COLORS.PRIMARY,
          }}>
          <Text style={styles.teamTitle}>{name}</Text>
          <Icon name="chevron-right" iconStyle={styles.icon} />
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    ...GST.p3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  teamTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.WHITE,
  },
  icon: {
    fontSize: 30,
    color: COLORS.WHITE,
  },
});
