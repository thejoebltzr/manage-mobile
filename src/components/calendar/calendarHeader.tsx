import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {Typography} from '@/src/styles';
import {COLORS} from '@/src/theme/colors';
import {SnapDate} from '@/src/types/calendar';
import {MONTHS} from '@/src/utils/date';

import Text from '../text';

interface CalendarHeaderProps {
  month?: SnapDate;
  monthFormat?: string;
  addMonth?: (num: number) => void;

  /** Handler which gets executed when press arrow icon left. It receive a callback can go back month */
  onPressArrowLeft?: (method: () => void, month?: SnapDate) => void;
  /** Handler which gets executed when press arrow icon right. It receive a callback can go next month */
  onPressArrowRight?: (method: () => void, month?: SnapDate) => void;
}

const CalendarHeader = ({
  month,
  addMonth: propsAddMonth,
  onPressArrowLeft,
  onPressArrowRight,
}: CalendarHeaderProps) => {
  const currentMonth = useMemo(
    () => (month ? new Date(month) : new Date()),
    [month],
  );
  const addMonth = useCallback(() => {
    propsAddMonth?.(1);
  }, [propsAddMonth]);

  const subtractMonth = useCallback(() => {
    propsAddMonth?.(-1);
  }, [propsAddMonth]);

  const onPressLeft = useCallback(() => {
    if (typeof onPressArrowLeft === 'function') {
      return onPressArrowLeft(subtractMonth, month);
    }
    return subtractMonth();
  }, [onPressArrowLeft, subtractMonth, month]);

  const onPressRight = useCallback(() => {
    if (typeof onPressArrowRight === 'function') {
      return onPressArrowRight(addMonth, month);
    }
    return addMonth();
  }, [onPressArrowRight, addMonth, month]);
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressLeft}>
          <View style={styles.arrowWrapper}>
            <FeatherIcon name="chevron-left" style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Text>
        </View>
        <TouchableOpacity onPress={onPressRight}>
          <View style={styles.arrowWrapper}>
            <FeatherIcon name="chevron-right" style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleWrapper: {
    justifyContent: 'center',
  },
  title: {
    ...Typography.title,
    color: COLORS.BLACK,
  },
  arrowWrapper: {
    padding: 5,
  },
  arrowIcon: {
    fontSize: 34,
  },
});

export default CalendarHeader;
