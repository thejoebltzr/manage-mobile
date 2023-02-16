import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';

import {Bulletin} from '@/src/types/Bulletin';
import {DrawerProps, ScreenNames} from '@/src/types/navigation';

import BasicCard from '../card/basicCard';
import {AnnouncementItem} from './announcementItem';

export type AnnouncementListProps = {
  data: Array<Bulletin>;
  fetching: boolean;
  error: boolean | null;
  errorText?: string;
  onRefresh?: () => void;
};

export const AnnouncementList = ({
  data,
  fetching,
  errorText,
  onRefresh,
}: AnnouncementListProps) => {
  const navigation = useNavigation<DrawerProps>();
  const renderItem = useCallback(
    ({item}: {item: Bulletin}) => {
      return (
        <AnnouncementItem
          announcements={item}
          onPress={() => {
            navigation.navigate(ScreenNames.AnnouncementDetails, {
              url: item.url,
            });
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
          <BasicCard errorText={errorText || 'No Announcements Found'} />
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
