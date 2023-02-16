import {DrawerScreenProps} from '@react-navigation/drawer';
import {FAB} from '@rneui/themed';
import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';

import Container from '@/src/components/container';
import {DrawerNavHeader} from '@/src/components/navigation/navHeaders';
import {PhotosList} from '@/src/components/photos/photosList';
import {useAppDispatch, useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import {setSelectedTeamId} from '@/src/store/reducers/teamsReducer';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
import {Photo} from '@/src/types/photo';

type EventsProps = DrawerScreenProps<ScreenParamList, ScreenNames.Events>;

const Events = ({navigation, route}: EventsProps) => {
  const {selectedTeams} = useAppSelector((state: RootState) => state.teams);
  const {currentSchool} = useAppSelector((state: RootState) => state.schools);

  const dispatch = useAppDispatch();
  const items = useMemo(
    () =>
      selectedTeams
        .filter(t => t.school_id === currentSchool?.school_id)
        .map(
          t =>
            ({
              initial: t.sport_gender_level.slice(0, 2),
              title: t.sport_gender_level,
              source: '',
              team_id: t.team_id,
            } as Photo),
        ),
    [currentSchool?.school_id, selectedTeams],
  );

  const onItemPress = useCallback(
    (team_id?: number) => {
      if (team_id) {
        dispatch(setSelectedTeamId(team_id));
        navigation.navigate(ScreenNames.TeamEvents);
      }
    },
    [dispatch, navigation],
  );

  const onAdd = useCallback(() => {
    navigation.navigate(ScreenNames.Teams);
  }, [navigation]);

  // attach the custom header
  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return <DrawerNavHeader title="Teams" />;
      },
    });
  }, [navigation, route]);

  return (
    <Container>
      <PhotosList data={items} onItemPress={onItemPress} />
      <FAB
        buttonStyle={styles.fab}
        placement="right"
        size="large"
        icon={{name: 'add', color: '#fff', size: 28}}
        onPress={onAdd}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  fab: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
export default Events;
