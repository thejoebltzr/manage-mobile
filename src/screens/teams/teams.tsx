import {DrawerScreenProps} from '@react-navigation/drawer';
import {FAB, Text} from '@rneui/themed';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';

import Container from '@/src/components/container';
import {SearchNavHeader} from '@/src/components/navigation/navHeaders';
import {BackButton} from '@/src/components/navigation/navItems';
import {TeamList} from '@/src/components/team';
import {useAppDispatch, useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import {
  getAllTeamsFailure,
  getAllTeamsRequest,
  getAllTeamsSuccess,
  setSelectedTeams,
} from '@/src/store/reducers/teamsReducer';
import {setIsInitialized} from '@/src/store/reducers/userReducer';
import {Typography} from '@/src/styles';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
import {SectionHeader} from '@/src/types/school';
import {SelectedTeam, Team, TeamSection} from '@/src/types/team';
import {HTTP_CLIENT} from '@/src/utils/config';
import {getCurrentSchoolYear} from '@/src/utils/date';
import {TEAMS_API_URL} from '@/src/utils/urls';

type TeamsProps = DrawerScreenProps<ScreenParamList, ScreenNames.Teams>;

const Teams = ({navigation}: TeamsProps) => {
  const {data, fetching, error, selectedTeams} = useAppSelector(
    (state: RootState) => {
      return state.teams;
    },
  );
  const {currentSchool} = useAppSelector((state: RootState) => {
    return state.schools;
  });
  const {isInitialized} = useAppSelector((state: RootState) => {
    return state.user;
  });
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useState<string>('');
  const [currentTeams, setCurrentTeams] =
    useState<Array<SelectedTeam>>(selectedTeams);

  const teams = useMemo(() => {
    let filteredData = data.filter(t =>
      t.sport_gender_level.toUpperCase().includes(searchString.toUpperCase()),
    );
    let res: Array<Team | SectionHeader> = [];

    const reducedData = filteredData.reduce((result: TeamSection, item) => {
      return {...result, [item.sport]: [...(result[item.sport] || []), item]};
    }, {});

    Object.keys(reducedData).forEach(item => {
      res.push({type: 'header', name: item});
      res = [...res, ...reducedData[item]];
    });
    return res;
  }, [data, searchString]);

  const fetchTeams = useCallback(() => {
    if (dispatch) {
      dispatch(getAllTeamsRequest({}));
      HTTP_CLIENT.get(TEAMS_API_URL, {
        params: {
          year: getCurrentSchoolYear(),
          subdomain: currentSchool?.subdomain,
          limit: 1000,
        },
      })
        .then(response => {
          dispatch(
            getAllTeamsSuccess({
              data: response.data?.objects || [],
            }),
          );
        })
        .catch(() => {
          dispatch(getAllTeamsFailure({}));
        });
    }
  }, [currentSchool?.subdomain, dispatch]);

  const onTeamPress = useCallback(
    (team: Team) => {
      if (!currentTeams.some(selected => selected.team_id === team.team_id)) {
        setCurrentTeams([
          ...currentTeams,
          {
            ...team,
            school_id: currentSchool?.school_id,
          },
        ]);
      } else {
        setCurrentTeams(
          currentTeams.filter(selected => selected.team_id !== team.team_id),
        );
      }
    },
    [currentSchool?.school_id, currentTeams],
  );

  const onSave = useCallback(() => {
    dispatch(setSelectedTeams(currentTeams));
    if (!isInitialized) {
      dispatch(setIsInitialized(true));
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: ScreenNames.PostResultStack}],
      });
    }
  }, [dispatch, currentTeams, isInitialized, navigation]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <SearchNavHeader
            leftButton={<BackButton color="#fff" />}
            onSearch={setSearchString}>
            <Text style={styles.title}>Team</Text>
          </SearchNavHeader>
        );
      },
    });
  }, [navigation]);

  // initial fetch of schools
  useEffect(() => {
    fetchTeams();
  }, [searchString, fetchTeams]);

  return (
    <Container>
      <TeamList
        data={teams}
        fetching={fetching}
        error={error}
        selectedTeams={currentTeams}
        onItemPress={onTeamPress}
        onRefresh={fetchTeams}
      />
      <FAB
        buttonStyle={styles.fab}
        placement="right"
        size="large"
        icon={{name: 'check', color: '#fff', size: 28}}
        onPress={onSave}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    ...Typography.title,
  },
  fab: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default Teams;
