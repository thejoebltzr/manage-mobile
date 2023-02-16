import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useCallback, useEffect} from 'react';

import {AnnouncementList} from '@/src/components/announcement/announcementList';
import Container from '@/src/components/container';
import {DrawerNavHeader} from '@/src/components/navigation/navHeaders';
import {useAppDispatch, useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import {
  getAllBulletinsFailure,
  getAllBulletinsRequest,
  getAllBulletinsSuccess,
} from '@/src/store/reducers/bulletinsReducer';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
import {HTTP_CLIENT} from '@/src/utils/config';
import {NEWS_API_URL} from '@/src/utils/urls';

type AnnouncementProps = DrawerScreenProps<
  ScreenParamList,
  ScreenNames.Announcements
>;

const Announcements = ({navigation, route}: AnnouncementProps) => {
  const {data, fetching, error} = useAppSelector((state: RootState) => {
    return state.bulletins;
  });

  const dispatch = useAppDispatch();

  const search = useCallback(() => {
    if (dispatch) {
      dispatch(getAllBulletinsRequest({}));
      HTTP_CLIENT.get(NEWS_API_URL, {
        params: {
          school_id: 891,
          order_by: '["-created_at"]',
          limit: 3,
        },
      })
        .then(response => {
          dispatch(
            getAllBulletinsSuccess({
              data: response.data.objects,
            }),
          );
        })
        .catch(() => {
          dispatch(getAllBulletinsFailure({}));
        });
    }
  }, [dispatch]);

  // attach the custom header
  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return <DrawerNavHeader title={ScreenNames.Announcements} />;
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
      <AnnouncementList
        data={data}
        fetching={fetching}
        error={error}
        onRefresh={search}
      />
    </Container>
  );
};

export default Announcements;
