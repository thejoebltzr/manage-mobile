import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {Event, TeamEventHeader} from '@/src/types/event';
import {DrawerProps, ScreenNames} from '@/src/types/navigation';

import BasicCard from '../card/basicCard';
import {EventItem} from './eventItem';
import {TeamEventItem} from './teamEventItem';

export interface EventListProps {
  data: Array<Event | TeamEventHeader>;
  fetching: boolean;
  error: boolean | null;
  errorText?: string;
  onRefresh?: () => void;
}

const keyExtractor = (item: Event | TeamEventHeader) => {
  if ('type' in item) {
    return item.name;
  }
  return item.event_id.toString();
};

export const EventList = ({
  data,
  fetching,
  errorText,
  onRefresh,
}: EventListProps) => {
  const navigation = useNavigation<DrawerProps>();

  const renderItem = useCallback(
    ({item}: {item: Event | TeamEventHeader}) => {
      if ('type' in item) {
        return (
          <TeamEventItem
            name={item.name}
            onPress={() =>
              navigation.navigate(ScreenNames.TeamEvents, {
                teamId: item.team_id,
              })
            }
          />
        );
      }
      return (
        <EventItem
          event={item}
          onPress={() => {
            navigation.navigate(ScreenNames.EventDetails, {event: item});
          }}
        />
      );
    },
    [navigation],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      removeClippedSubviews
      refreshControl={
        <RefreshControl refreshing={fetching} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View style={styles.container}>
          <BasicCard errorText={errorText || 'No Events Found'} />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
  },
});
