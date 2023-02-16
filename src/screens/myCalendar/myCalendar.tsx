import moment from 'moment';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Calendar from '@/src/components/calendar';
import Container from '@/src/components/container';
import {EventList} from '@/src/components/event';
import Text from '@/src/components/text';
import {useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import {Typography} from '@/src/styles';
import {COLORS} from '@/src/theme/colors';
import {SnapDate} from '@/src/types/calendar';
import {Event} from '@/src/types/event';

const MyCalendar = () => {
  const {selectedEvents} = useAppSelector((state: RootState) => state.events);
  const [events, setEvents] = useState<Event[]>([]);
  const eventDates = useMemo(
    () => selectedEvents.map(e => e.event_date),
    [selectedEvents],
  );

  const filterEvents = useCallback(
    (d: SnapDate) => {
      if (typeof d === 'string') {
        setEvents(
          selectedEvents.filter(e => {
            return moment(e.event_date, 'M/D/YYYY').isSame(
              moment(d, 'M/D/YYYY'),
            );
          }),
        );
      } else {
        setEvents(
          selectedEvents.filter(e => {
            return moment(e.event_date, 'M/D/YYYY').isSame(d);
          }),
        );
      }
    },
    [selectedEvents],
  );

  return (
    <Container shouldScroll>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          This is Your Personal Calendar - To add events: go to Events - select
          event - Add to Calendar
        </Text>
      </View>
      <Calendar eventDates={eventDates} onDatePress={filterEvents} />
      <EventList data={events} fetching={false} error={false} />
    </Container>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    backgroundColor: COLORS.TW_BLUE_600,
    padding: 10,
  },
  title: {
    ...Typography.title,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default MyCalendar;
