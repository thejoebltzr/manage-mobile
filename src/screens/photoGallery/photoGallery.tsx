import {StackScreenProps} from '@react-navigation/stack';
import {AxiosResponse} from 'axios';
import React, {useCallback, useEffect, useMemo} from 'react';

import Container from '@/src/components/container';
import {PhotoGalleryList} from '@/src/components/photoGallery/photoGalleryList';
import {useAppDispatch, useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import {
  getAllImagesFailure,
  getAllImagesRequest,
  getAllImagesSuccess,
} from '@/src/store/reducers/imagesReducer';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
import {Team} from '@/src/types/team';
import {HTTP_CLIENT} from '@/src/utils/config';
import {getCurrentSchoolYear} from '@/src/utils/date';
import {IMAGES_API_URL, TEAM_DETAILS_API_URL} from '@/src/utils/urls';

type PostResultDetailsProps = StackScreenProps<
  ScreenParamList,
  ScreenNames.PhotoGallery
>;

const PhotoGallery = ({route}: PostResultDetailsProps) => {
  const {data, fetching} = useAppSelector((state: RootState) => {
    return state.images;
  });
  const {currentSchool} = useAppSelector((state: RootState) => state.schools);
  const {selectedTeamId} = useAppSelector((state: RootState) => state.teams);
  const teamId = useMemo(
    () => route.params?.teamId || selectedTeamId,
    [route.params?.teamId, selectedTeamId],
  );

  const dispatch = useAppDispatch();

  const search = useCallback(async () => {
    if (dispatch && teamId) {
      try {
        dispatch(getAllImagesRequest({}));
        const teamResponse: AxiosResponse<Team> = await HTTP_CLIENT.get(
          TEAM_DETAILS_API_URL(teamId),
          {
            params: {
              subdomain: currentSchool?.subdomain,
              year: getCurrentSchoolYear(),
              include_roster: true,
            },
          },
        );
        const response = await HTTP_CLIENT.get(IMAGES_API_URL, {
          params: {
            limit: 1000,
            offset: 0,
            subdomain: currentSchool?.subdomain,
            sport_gender_level: teamResponse.data.sport_gender_level,
            order_by: '["-created_at"]',
          },
        });
        dispatch(getAllImagesSuccess({data: response.data.objects}));
      } catch {
        dispatch(getAllImagesFailure({}));
      }
    }
  }, [currentSchool?.subdomain, dispatch, teamId]);

  useEffect(() => {
    search();
  }, [dispatch, search]);

  return (
    <Container>
      <PhotoGalleryList data={data} fetching={fetching} onRefresh={search} />
    </Container>
  );
};

export default PhotoGallery;
