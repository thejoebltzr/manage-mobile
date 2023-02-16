import {DrawerScreenProps} from '@react-navigation/drawer';
import {AxiosResponse} from 'axios';
import React, {useCallback, useEffect} from 'react';

import {AnnouncementList} from '@/src/components/announcement/announcementList';
import Container from '@/src/components/container';
import {useAppDispatch, useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import {
  getAllBulletinsFailure,
  getAllBulletinsRequest,
  getAllBulletinsSuccess,
} from '@/src/store/reducers/bulletinsReducer';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
import {Team} from '@/src/types/team';
import {HTTP_CLIENT} from '@/src/utils/config';
import {getCurrentSchoolYear} from '@/src/utils/date';
import {NEWS_API_URL, TEAM_DETAILS_API_URL} from '@/src/utils/urls';

type EventNewsProps = DrawerScreenProps<ScreenParamList, ScreenNames.TeamNews>;

const EventNews = ({}: EventNewsProps) => {
  const {data, fetching, error} = useAppSelector(
    (state: RootState) => state.bulletins,
  );
  const {currentSchool} = useAppSelector((state: RootState) => state.schools);
  const {selectedTeamId} = useAppSelector((state: RootState) => state.teams);
  const dispatch = useAppDispatch();
  const search = useCallback(async () => {
    if (dispatch && selectedTeamId) {
      dispatch(getAllBulletinsRequest({}));
      try {
        const teamResponse: AxiosResponse<Team> = await HTTP_CLIENT.get(
          TEAM_DETAILS_API_URL(selectedTeamId),
          {
            params: {
              subdomain: currentSchool?.subdomain,
              year: getCurrentSchoolYear(),
              include_roster: true,
            },
          },
        );
        const response = await HTTP_CLIENT.get(NEWS_API_URL, {
          params: {
            school_id: currentSchool?.school_id,
            order_by: '["-created_at"]',
            sport_gender_level: teamResponse.data.sport_gender_level,
            limit: 20,
          },
        });

        dispatch(
          getAllBulletinsSuccess({
            data: response.data.objects,
          }),
        );
      } catch {
        dispatch(getAllBulletinsFailure({}));
      }
    }
  }, [
    currentSchool?.school_id,
    currentSchool?.subdomain,
    dispatch,
    selectedTeamId,
  ]);

  useEffect(() => {
    search();
  }, [search]);
  return (
    <Container>
      <AnnouncementList
        data={data}
        error={error}
        fetching={fetching}
        onRefresh={search}
      />
    </Container>
  );
};

export default EventNews;
