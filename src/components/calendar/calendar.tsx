import moment from 'moment';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {CalendarRow, SnapDate} from '@/src/types/calendar';
import {
  addMonth,
  getMonthDates,
  getMonthFirstDate,
  getMonthLastDate,
  isDateEqual,
  WEEK_DAYS,
} from '@/src/utils/date';

import Text from '../text';
import CalendarHeader from './calendarHeader';
import Day from './day';

interface CalendarProps {
  eventDates?: SnapDate[];
  initialDate?: SnapDate;
  minDate?: SnapDate;
  maxDate?: SnapDate;
  onDatePress?: (d: SnapDate) => void;
}

const Calendar = ({
  initialDate,
  eventDates,
  onDatePress: onDatePressParam,
}: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<SnapDate>('');
  const currentDate = useMemo(
    () => (initialDate ? new Date(initialDate) : new Date()),
    [initialDate],
  );
  const [currentMonth, setCurrentMonth] = useState<Date>(currentDate);
  const firstDate = useMemo(
    () => getMonthFirstDate(currentMonth),
    [currentMonth],
  );
  const lastDate = useMemo(
    () => getMonthLastDate(currentMonth),
    [currentMonth],
  );

  const updateMonth = useCallback(
    (n: number) => {
      setCurrentMonth(addMonth(currentMonth, n));
    },
    [currentMonth, setCurrentMonth],
  );

  const isEvent = useCallback(
    (d: SnapDate) => {
      if (typeof d === 'string') {
        return eventDates?.some(eDate => {
          if (typeof eDate === 'string') {
            return moment(eDate, 'M/D/YYYY').isSame(moment(d, 'M/D/YYYY'));
          } else {
            return moment(eDate).isSame(moment(d, 'M/D/YYYY'));
          }
        });
      } else {
        return eventDates?.some(eDate => {
          if (typeof eDate === 'string') {
            return moment(eDate, 'M/D/YYYY').isSame(moment(d));
          } else {
            return moment(eDate).isSame(moment(d));
          }
        });
      }
    },
    [eventDates],
  );

  const onDatePress = useCallback(
    (d: SnapDate) => {
      if (onDatePressParam) {
        onDatePressParam(d);
      }
      setSelectedDate(d);
    },
    [onDatePressParam],
  );

  const renderDates = useMemo(() => {
    const rows: CalendarRow = {};
    const dates = getMonthDates(firstDate, lastDate);
    const dayOfWeek = firstDate.getDay();

    let currentRow = 0;
    let currentCol = 0;

    // insert blank to first row to fix alignment
    for (let d = 0; d < dayOfWeek; d++) {
      rows[currentRow] = [...(rows[currentRow] || []), ''];
      currentCol += 1;
    }

    // insert the dates
    dates.forEach(date => {
      rows[currentRow] = [...(rows[currentRow] || []), date];
      // if already in the last column
      if (currentCol === 6) {
        currentRow += 1;
        currentCol = 0;
      } else {
        currentCol += 1;
      }
    });

    // insert blank to last row to fix alignment
    while (currentCol !== 7) {
      rows[currentRow] = [...(rows[currentRow] || []), ''];
      currentCol += 1;
    }

    // map each it
    return Object.keys(rows).map(key => {
      return (
        <View style={styles.row} key={key}>
          {rows[key].map((date: SnapDate, index) => (
            <Day
              date={date}
              key={`${key}-${index}`}
              isCurrent={
                typeof date !== 'string' && isDateEqual(date, currentDate)
              }
              isSelected={
                typeof date !== 'string' &&
                typeof selectedDate !== 'string' &&
                isDateEqual(date, selectedDate)
              }
              isEvent={isEvent(date)}
              onPress={() => onDatePress(date)}
            />
          ))}
        </View>
      );
    });
  }, [currentDate, firstDate, isEvent, lastDate, onDatePress, selectedDate]);

  return (
    <View>
      <CalendarHeader month={currentMonth} addMonth={updateMonth} />
      <View style={styles.row}>
        {WEEK_DAYS.map((day, index) => (
          <Text key={index} style={styles.weekDaysText}>
            {day}
          </Text>
        ))}
      </View>
      <View>{renderDates}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  weekDaysText: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Calendar;
