import {DrawerScreenProps} from '@react-navigation/drawer';
import moment from 'moment';
import React, {useCallback, useEffect} from 'react';

import Container from '@/src/components/container';
import {EventList} from '@/src/components/event';
import {useAppDispatch, useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import {
  getAllEventsFailure,
  getAllEventsRequest,
  getAllEventsSuccess,
} from '@/src/store/reducers/eventsReducer';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
import {HTTP_CLIENT} from '@/src/utils/config';
import {EVENTS_API_URL} from '@/src/utils/urls';

type EventResultsProps = DrawerScreenProps<
  ScreenParamList,
  ScreenNames.EventResults
>;

const EventResults = ({navigation}: EventResultsProps) => {
  const {data, fetching, error} = useAppSelector((state: RootState) => {
    return state.events;
  });
  const {currentSchool} = useAppSelector((state: RootState) => state.schools);
  const {selectedTeamId} = useAppSelector((state: RootState) => state.teams);
  const dispatch = useAppDispatch();

  const search = useCallback(() => {
    if (dispatch) {
      dispatch(getAllEventsRequest({}));
      const today = new Date();
      const startSY = new Date(today.getFullYear(), 6, 1);

      HTTP_CLIENT.get(EVENTS_API_URL, {
        params: {
          subdomain: currentSchool?.subdomain,
          event_date: {
            $gt: moment(
              startSY > today
                ? new Date(today.getFullYear() + 1, 6, 1)
                : startSY,
            ).format('YYYY-MM-DD'),
            $lt: moment(today).format('YYYY-MM-DD'),
          },
          order_by: ['event_date'],
          team_id: selectedTeamId,
          kind: 'Game',
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

export default EventResults;
