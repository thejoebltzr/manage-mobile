import geolocation from '@react-native-community/geolocation';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import {AxiosError} from 'axios';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import ButtonGroup from '@/src/components/buttonGroup';
import {SearchNavHeader} from '@/src/components/navigation/navHeaders';
import {BackButton} from '@/src/components/navigation/navItems';
import {SchoolList} from '@/src/components/school/';
import {useAppDispatch} from '@/src/hooks/store';
import {setCurrentSchool} from '@/src/store/reducers/schoolsReducer';
import {GST} from '@/src/theme/globalStyles';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
import {School, SchoolSection, SectionHeader} from '@/src/types/school';
import {HTTP_CLIENT} from '@/src/utils/config';
import {notifyMessage} from '@/src/utils/helpers';
import {SCHOOLS_API_URL} from '@/src/utils/urls';

type AllSchoolsProps = DrawerScreenProps<
  ScreenParamList,
  ScreenNames.AllSchools
>;

type AllSchoolsState = {
  data: School[];
  fetching: boolean;
  error: boolean;
};

const PAGE_SIZE = 10;

const AllSchools = ({navigation}: AllSchoolsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [page, setPage] = useState(1);
  const [state, setState] = useState<AllSchoolsState>({
    data: [],
    fetching: false,
    error: false,
  });
  const {data, fetching, error} = state;
  const dispatch = useAppDispatch();
  /**
   * 1. Sort the data base on school name
   * 2. Separate schools into sections based on the first letter of the school name
   * 3. Push objects to array to include headers and school contents
   * 4. Return the array as schools
   */
  const schools = useMemo(() => {
    // handle pagination and searching of schools
    let filteredData = data.filter(s =>
      s.name.toLowerCase().includes(searchString.toLowerCase()),
    );
    filteredData = filteredData.slice(0, page * PAGE_SIZE);

    const reducedSchools = filteredData.reduce(
      (result: SchoolSection, item) => ({
        ...result,
        [item.name.charAt(0)]: [...(result[item.name.charAt(0)] || []), item],
      }),
      {},
    );

    // use the reducedSchool to create a single array with the headers and content
    let s: Array<School | SectionHeader> = [];
    Object.keys(reducedSchools).forEach(section => {
      s.push({type: 'header', name: section});
      s = [...s, ...reducedSchools[section]];
    });
    return s;
  }, [data, page, searchString]);

  const fetchSchools = useCallback((position?: [number, number, number]) => {
    setState(prevState => ({...prevState, fetching: true}));

    const params: {
      limit?: number;
      order_by?: string[];
      query_distance?: typeof position;
    } = {
      limit: 1000,
      order_by: ['name'],
    };

    if (position) {
      params.query_distance = position;
    }
    HTTP_CLIENT.get(SCHOOLS_API_URL, {
      params: {
        ...params,
        query_distance: JSON.stringify(position),
      },
    })
      .then(response => {
        setState({
          data: response.data?.objects || [],
          fetching: false,
          error: false,
        });
      })
      .catch((err: AxiosError<any>) => {
        console.log(err.response);
        setState(prevState => ({
          ...prevState,
          fetching: false,
          error: true,
        }));
      });
  }, []);

  const onSchoolPress = useCallback(
    (school: School) => {
      dispatch(setCurrentSchool(school));
      navigation.navigate(ScreenNames.Teams);
    },
    [dispatch, navigation],
  );

  const onChangeType = useCallback(
    (value: number) => {
      setSelectedIndex(value);
      if (value === 1) {
        geolocation.getCurrentPosition(
          response => {
            fetchSchools([
              response.coords.latitude,
              response.coords.longitude,
              10,
            ]);
          },
          err => {
            notifyMessage(err.message);
          },
          {
            enableHighAccuracy: true,
          },
        );
      } else {
        fetchSchools();
      }
    },
    [fetchSchools],
  );

  // attach the custom header
  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <SearchNavHeader
            leftButton={<BackButton color="#fff" />}
            onSearch={setSearchString}>
            <ButtonGroup
              buttons={['All schools', 'Near me']}
              selectedIndex={selectedIndex}
              onPress={onChangeType}
            />
          </SearchNavHeader>
        );
      },
    });
  }, [navigation, onChangeType, selectedIndex]);

  // initial fetch of schools
  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  return (
    <View style={styles.container}>
      <SchoolList
        data={schools}
        fetching={fetching}
        error={error}
        onItemPress={onSchoolPress}
        onEndReached={() => setPage(n => n + 1)}
        onEndReachedThreshold={0.8}
        onRefresh={fetchSchools}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GST.MAIN_CONTAINER,
  },
});

export default AllSchools;
