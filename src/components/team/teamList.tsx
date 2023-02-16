import React, {useCallback} from 'react';
import {RefreshControl, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {SectionHeader} from '@/src/types/school';
import {Team} from '@/src/types/team';

import BasicCard from '../card/basicCard';
import {TeamDivider, TeamItem} from '.';

interface TeamListProps {
  data: Array<Team | SectionHeader>;
  fetching: boolean;
  error: boolean | null;
  selectedTeams: Array<Team>;
  onItemPress?: (team: Team) => void;
  onRefresh?: () => void;
}

const keyExtractor = (item: Team | SectionHeader) => {
  if ('type' in item) {
    return item.name;
  }
  return item.team_id.toString();
};

export const TeamList = ({
  data,
  fetching,
  selectedTeams,
  onItemPress,
  onRefresh,
}: TeamListProps) => {
  const renderItem = useCallback(
    ({item}: {item: Team | SectionHeader}) => {
      if ('type' in item) {
        return <TeamDivider name={item.name} />;
      }
      return (
        <TeamItem
          team={item}
          onPress={onItemPress}
          isSelected={selectedTeams.some(
            selected => selected.team_id === item.team_id,
          )}
        />
      );
    },
    [onItemPress, selectedTeams],
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
        <View>
          <BasicCard errorText={'No Teams Found'} />
        </View>
      }
    />
  );
};
