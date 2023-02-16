import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useCallback, useEffect} from 'react';

import Container from '@/src/components/container';
import {DrawerNavHeader} from '@/src/components/navigation/navHeaders';
import {PostList} from '@/src/components/postResults/postList';
import {useAppDispatch, useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import {
  getAllEventsFailure,
  getAllEventsRequest,
  getAllEventsSuccess,
} from '@/src/store/reducers/eventsReducer';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
import {HTTP_CLIENT} from '@/src/utils/config';
import {EVENTS_API_URL} from '@/src/utils/urls';

type PostResultProps = DrawerScreenProps<
  ScreenParamList,
  ScreenNames.PostResults
>;

const PostResults = ({navigation, route}: PostResultProps) => {
  const {data, fetching, error} = useAppSelector((state: RootState) => {
    return state.events;
  });

  const {selectedTeams} = useAppSelector((state: RootState) => {
    return state.teams;
  });

  const {currentSchool} = useAppSelector((state: RootState) => {
    return state.schools;
  });

  const dispatch = useAppDispatch();

  const search = useCallback(() => {
    if (dispatch) {
      dispatch(getAllEventsRequest({}));

      HTTP_CLIENT.get(EVENTS_API_URL, {
        params: {
          kind: 'Game',
          subdomain: currentSchool?.subdomain,
          // team_id: selectedTeams,
          team_id: {$in: selectedTeams},
        },
      })
        .then(response => {
          dispatch(
            getAllEventsSuccess({
              data: response.data?.objects || [],
            }),
          );
        })
        .catch(() => {
          dispatch(getAllEventsFailure({}));
        });
    }
  }, [dispatch, currentSchool, selectedTeams]);

  // attach the custom header
  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return <DrawerNavHeader title="Post Results" />;
      },
    });
  }, [navigation, route]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // fetch when screen focused
      search();
    });

    // remove listener on unmount
    return unsubscribe;
  }, [navigation, search]);

  return (
    <Container>
      <PostList
        data={data}
        fetching={fetching}
        error={error}
        onRefresh={search}
      />
    </Container>
  );
};

export default PostResults;
