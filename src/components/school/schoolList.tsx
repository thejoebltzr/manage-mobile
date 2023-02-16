import React, {useCallback} from 'react';
import {RefreshControl, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {School, SectionHeader} from '@/src/types/school';

import BasicCard from '../card/basicCard';
import {SchoolDivider, SchoolItem} from '.';

export type SchoolListProps = {
  data: Array<School | SectionHeader>;
  fetching: boolean;
  error: boolean | null;
  onEndReachedThreshold?: number;
  onItemPress?: (school: School) => void;
  onEndReached?: () => void;
  onRefresh?: () => void;
};

const keyExtractor = (item: School | SectionHeader) => {
  if ('type' in item) {
    return item.name;
  }
  return item.school_id.toString();
};

export const SchoolList = ({
  data,
  fetching,
  onEndReachedThreshold,
  onItemPress,
  onEndReached,
  onRefresh,
}: SchoolListProps) => {
  const renderItem = useCallback(
    ({item}: {item: School | SectionHeader}) => {
      if ('type' in item) {
        return <SchoolDivider header={item} />;
      }
      return (
        <SchoolItem
          key={item.school_id}
          school={item}
          onPress={() => onItemPress?.(item)}
        />
      );
    },
    [onItemPress],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={onEndReachedThreshold}
      onEndReached={onEndReached}
      removeClippedSubviews
      refreshControl={
        <RefreshControl refreshing={fetching} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View>
          <BasicCard errorText={'No Schools Found'} />
        </View>
      }
    />
  );
};
