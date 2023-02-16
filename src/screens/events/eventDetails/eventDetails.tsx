import {StackScreenProps} from '@react-navigation/stack';
import {AxiosResponse} from 'axios';
import moment from 'moment';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Linking, Share, StyleSheet, View} from 'react-native';

import Button from '@/src/components/button';
import Container from '@/src/components/container';
import {EventCard, TeamEventItem} from '@/src/components/event';
import Icon from '@/src/components/icon';
import {StackNavHeader} from '@/src/components/navigation/navHeaders';
import {BackButton} from '@/src/components/navigation/navItems';
import {RosterList} from '@/src/components/rosters';
import {useAppDispatch, useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import {setSelectedEvents} from '@/src/store/reducers/eventsReducer';
import {COLORS} from '@/src/theme/colors';
import {GST} from '@/src/theme/globalStyles';
import {selectStyle} from '@/src/theme/responsive';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
import {Team} from '@/src/types/team';
import {HTTP_CLIENT} from '@/src/utils/config';
import {getCurrentSchoolYear} from '@/src/utils/date';
import {notifyMessage} from '@/src/utils/helpers';
import {TEAM_DETAILS_API_URL} from '@/src/utils/urls';

type EventDetailsProps = StackScreenProps<
  ScreenParamList,
  ScreenNames.EventDetails
>;

const EventDetails = ({navigation, route}: EventDetailsProps) => {
  const {event} = route.params;
  const {currentSchool} = useAppSelector((state: RootState) => state.schools);
  const {selectedEvents} = useAppSelector((state: RootState) => state.events);
  const [team, setTeam] = useState<Team>();

  const dispatch = useAppDispatch();

  const showPostResult = useMemo(() => {
    return (
      event.kind === 'Game' &&
      event.results.length === 0 &&
      !event.cancellation_status &&
      moment(event.event_date, 'M/D/YYYY').isBefore(moment())
    );
  }, [event]);

  const isSelected = useMemo(
    () => selectedEvents.some(e => e.event_id === event.event_id),
    [event.event_id, selectedEvents],
  );

  const addEvent = useCallback(() => {
    dispatch(setSelectedEvents([...selectedEvents, event]));
  }, [dispatch, selectedEvents, event]);

  const removeEvent = useCallback(() => {
    dispatch(
      setSelectedEvents(
        selectedEvents.filter(e => e.event_id !== event.event_id),
      ),
    );
  }, [dispatch, selectedEvents, event]);

  const onShare = useCallback(async () => {
    try {
      const result = await Share.share({
        message: event.description,
        url: event.url,
        title: event.description,
      });
      if (result.action === Share.sharedAction) {
        if (
          result.activityType === 'com.apple.UIKit.activity.CopyToPasteboard'
        ) {
          notifyMessage('Event url has been copied to clipboard.');
        } else {
          notifyMessage('Event has been shared.');
        }
      }
    } catch (error: any) {
      notifyMessage(error.message);
    }
  }, [event.description, event.url]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <StackNavHeader
            title={route.name}
            leftButton={<BackButton color={COLORS.WHITE} />}>
            {!isSelected ? (
              <Button onPress={addEvent}>Add</Button>
            ) : (
              <Button onPress={removeEvent}>Remove</Button>
            )}
            <Button onPress={onShare}>
              <Icon name="share" color={COLORS.WHITE} />
            </Button>
          </StackNavHeader>
        );
      },
    });
  }, [addEvent, isSelected, navigation, onShare, removeEvent, route]);

  useEffect(() => {
    HTTP_CLIENT.get(TEAM_DETAILS_API_URL(event.team_id), {
      params: {
        subdomain: currentSchool?.subdomain,
        year: getCurrentSchoolYear(),
        include_roster: true,
      },
    }).then((response: AxiosResponse<Team>) => {
      setTeam(response.data);
    });
  }, [currentSchool?.subdomain, event.team_id]);

  return (
    <Container
      shouldScroll
      contentContainerStyle={selectStyle({
        large: {flexDirection: 'row'},
        default: {},
      })}>
      <View
        style={selectStyle({
          large: GST.w50,
          default: {},
        })}>
        <View style={styles.eventCard}>
          <EventCard event={event} school={currentSchool} team={team} />
        </View>
        <View style={styles.actionContainer}>
          <View style={styles.action}>
            <TeamEventItem
              name="See Full Details"
              onPress={() => {
                if (event.url) {
                  Linking.openURL(event.url);
                }
              }}
            />
          </View>
          {showPostResult && (
            <View style={styles.action}>
              <TeamEventItem
                name="Post Result"
                onPress={() => {
                  navigation.navigate(ScreenNames.PostResultDetails, {event});
                }}
                backgroundColor={COLORS.GREEN_500}
              />
            </View>
          )}
        </View>
      </View>
      <View
        style={selectStyle({
          large: GST.w50,
          default: {},
        })}>
        <RosterList data={team?.roster || []} hasHeader />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    marginBottom: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    marginHorizontal: 10,
  },
  action: {
    flexGrow: 1,
    ...GST.w50,
  },
});

export default EventDetails;
