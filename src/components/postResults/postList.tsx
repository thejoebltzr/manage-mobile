import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';

import {Event} from '@/src/types/event';
import {DrawerProps, ScreenNames} from '@/src/types/navigation';

import BasicCard from '../card/basicCard';
import {EventItem} from '../event';

export type PostListProps = {
  data: Array<Event>;
  fetching: boolean;
  error: boolean | null;
  errorText?: string;
  onRefresh?: () => void;
};

export const PostList = ({
  data,
  fetching,
  errorText,
  onRefresh,
}: PostListProps) => {
  const navigation = useNavigation<DrawerProps>();

  const renderItem = useCallback(
    ({item}: {item: Event}) => {
      return (
        <EventItem
          event={item}
          onPress={() => {
            navigation.navigate(ScreenNames.PostResultDetails, {event: item});
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
