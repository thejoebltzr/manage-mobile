import {DrawerScreenProps} from '@react-navigation/drawer';
import {AxiosResponse} from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, StyleSheet} from 'react-native';

import Container from '@/src/components/container';
import {RosterList} from '@/src/components/rosters';
import {useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import {COLORS} from '@/src/theme/colors';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
import {Team} from '@/src/types/team';
import {HTTP_CLIENT} from '@/src/utils/config';
import {getCurrentSchoolYear} from '@/src/utils/date';
import {TEAM_DETAILS_API_URL} from '@/src/utils/urls';

type EventRosterProps = DrawerScreenProps<ScreenParamList, ScreenNames.Roster>;

const EventRoster = ({}: EventRosterProps) => {
  const {currentSchool} = useAppSelector((state: RootState) => state.schools);
  const {selectedTeamId} = useAppSelector((state: RootState) => state.teams);
  const [team, setTeam] = useState<Team>();
  const [fetching, setFetching] = useState<boolean>(false);

  const fetchRoster = useCallback(() => {
    if (selectedTeamId) {
      setFetching(true);
      HTTP_CLIENT.get(TEAM_DETAILS_API_URL(selectedTeamId), {
        params: {
          subdomain: currentSchool?.subdomain,
          year: getCurrentSchoolYear(),
          include_roster: true,
        },
      })
        .then((response: AxiosResponse<Team>) => {
          setFetching(false);
          setTeam(response.data);
        })
        .catch(() => setFetching(false));
    }
  }, [currentSchool?.subdomain, selectedTeamId]);

  useEffect(() => {
    fetchRoster();
  }, [fetchRoster]);

  return (
    <Container
      shouldScroll
      refreshControl={
        <RefreshControl refreshing={fetching} onRefresh={fetchRoster} />
      }>
      <RosterList
        data={team?.roster || []}
        hasHeader
        headerStyle={styles.headerStyle}
        headerTitleStyle={styles.titleStyle}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: COLORS.WHITE,
  },
  titleStyle: {
    color: COLORS.BLACK,
  },
});
export default EventRoster;
