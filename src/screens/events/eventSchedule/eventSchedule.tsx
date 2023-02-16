import {DrawerScreenProps} from '@react-navigation/drawer';
import moment from 'moment';
import React, {useCallback, useEffect} from 'react';

import Button from '@/src/components/button';
import Container from '@/src/components/container';
import {EventList} from '@/src/components/event';
import {StackNavHeader} from '@/src/components/navigation/navHeaders';
import {BackButton} from '@/src/components/navigation/navItems';
import {useAppDispatch, useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import {
  getAllEventsFailure,
  getAllEventsRequest,
  getAllEventsSuccess,
  setSelectedEvents,
} from '@/src/store/reducers/eventsReducer';
import {COLORS} from '@/src/theme/colors';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
import {HTTP_CLIENT} from '@/src/utils/config';
import {notifyMessage} from '@/src/utils/helpers';
import {EVENTS_API_URL} from '@/src/utils/urls';

type EventScheduleProps = DrawerScreenProps<
  ScreenParamList,
  ScreenNames.EventSchedule
>;

const EventSchedule = ({navigation, route}: EventScheduleProps) => {
  const {data, fetching, error, selectedEvents} = useAppSelector(
    (state: RootState) => state.events,
  );
  const {currentSchool} = useAppSelector((state: RootState) => state.schools);
  const {selectedTeamId} = useAppSelector((state: RootState) => state.teams);
  const dispatch = useAppDispatch();

  const search = useCallback(() => {
    if (dispatch) {
      dispatch(getAllEventsRequest({}));
      const today = new Date();
      const startSY = new Date(today.getFullYear(), 7, 1);

      HTTP_CLIENT.get(EVENTS_API_URL, {
        params: {
          subdomain: currentSchool?.subdomain,
          event_date: {
            $gt: moment(
              startSY > today
                ? new Date(today.getFullYear() + 1, 7, 1)
                : startSY,
            ).format('YYYY-MM-DD'),
            $lt: moment(today).format('YYYY-MM-DD'),
          },
          order_by: ['event_date'],
          team_id: selectedTeamId,
          limit: 1000,
        },
      })
        .then(response => {
          dispatch(
            getAllEventsSuccess({
              data: response.data?.objects || [],
            }),
          );
        })
        .catch(() => {
          dispatch(getAllEventsFailure({}));
        });
    }
  }, [currentSchool?.subdomain, dispatch, selectedTeamId]);

  const addAllEvents = useCallback(() => {
    // only add events that doesn't exist in the store
    const eventsToBeAdded = data.filter(
      e => !selectedEvents.some(s => s.event_id === e.event_id),
    );
    dispatch(setSelectedEvents([...selectedEvents, ...eventsToBeAdded]));
    notifyMessage('All events added to the calendar!');
  }, [data, dispatch, selectedEvents]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <StackNavHeader
            title={route.name}
            leftButton={<BackButton color={COLORS.WHITE} />}>
            <Button onPress={addAllEvents}>Add all</Button>
          </StackNavHeader>
        );
      },
    });
  }, [addAllEvents, navigation, route.name]);

  // initial fetch
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // fetch when screen focused
      search();
    });

    // remove listener on unmount
    return unsubscribe;
  }, [navigation, search]);

  return (
    <Container>
      <EventList
        data={data}
        fetching={fetching}
        error={error}
        onRefresh={search}
      />
    </Container>
  );
};

export default EventSchedule;
