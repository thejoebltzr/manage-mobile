import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {COLORS} from '@/src/theme/colors';
import {SnapDate} from '@/src/types/calendar';

import Text from '../text';

interface DayProps {
  date: SnapDate;
  isCurrent?: boolean;
  isSelected?: boolean;
  isEvent?: boolean;
  onPress?: () => void;
}

const Day = ({
  date: dateProp,
  isCurrent,
  isSelected,
  isEvent,
  onPress,
}: DayProps) => {
  // display blank date for alignment
  if (!dateProp) {
    return <View style={styles.date} />;
  }

  const date = typeof dateProp === 'string' ? new Date(dateProp) : dateProp;

  const dayStyle: Array<ViewStyle> = [styles.date];
  const textStyle: Array<TextStyle> = [styles.dateText];
  if (isSelected) {
    dayStyle.push(styles.selectedDate);
    textStyle.push(styles.selectedDateText);
  } else if (isCurrent) {
    dayStyle.push(styles.currentDate);
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={dayStyle}>
        {isEvent && <View style={styles.eventDate} />}
        <Text style={textStyle}>{date.getDate()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  date: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontWeight: '600',
    fontSize: 16,
  },
  currentDate: {
    borderRadius: 100,
    backgroundColor: COLORS.TW_GRAY_300,
  },
  selectedDate: {
    borderRadius: 100,
    backgroundColor: COLORS.DARK_BLUE,
  },
  selectedDateText: {
    color: COLORS.WHITE,
  },
  eventDate: {
    backgroundColor: 'red',
    width: 5,
    height: 5,
    borderRadius: 5,
    position: 'absolute',
    top: 5,
  },
});

export default Day;
