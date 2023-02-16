import type {DrawerScreenProps} from '@react-navigation/drawer';
import {FAB} from '@rneui/themed';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';

import Container from '@/src/components/container';
import {SearchNavHeader} from '@/src/components/navigation/navHeaders';
import {DrawerButton} from '@/src/components/navigation/navItems';
import {SchoolList} from '@/src/components/school/';
import Text from '@/src/components/text';
import {useAppDispatch, useAppSelector} from '@/src/hooks/store';
import type {RootState} from '@/src/store';
import {setCurrentSchool} from '@/src/store/reducers/schoolsReducer';
import {GST} from '@/src/theme/globalStyles';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
import {School} from '@/src/types/school';

type MySchoolsProps = DrawerScreenProps<ScreenParamList, ScreenNames.MySchools>;

const PAGE_SIZE = 10;

const MySchools = ({navigation, route}: MySchoolsProps) => {
  const [searchString, setSearchString] = useState('');
  const [page, setPage] = useState(1);

  const {selectedSchools} = useAppSelector((state: RootState) => {
    return state.schools;
  });
  const dispatch = useAppDispatch();
  /**
   * 1. Sort the data base on school name
   * 2. Separate schools into sections based on the first letter of the school name
   * 3. Push objects to array to include headers and school contents
   * 4. Return the array as schools
   */
  const schools = useMemo(() => {
    // handle pagination and searching of schools
    let filteredData = selectedSchools.filter(s =>
      s.name.toLowerCase().includes(searchString.toLowerCase()),
    );
    filteredData = filteredData.slice(0, page * PAGE_SIZE);
    return filteredData;
  }, [page, searchString, selectedSchools]);

  const onSchoolPress = useCallback(
    (school: School) => {
      dispatch(setCurrentSchool(school));
      navigation.reset({
        index: 0,
        routes: [{name: ScreenNames.PostResultStack}],
      });
    },
    [dispatch, navigation],
  );

  const onAdd = useCallback(() => {
    navigation.navigate(ScreenNames.AllSchools);
  }, [navigation]);

  // attach the custom header
  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <SearchNavHeader
            leftButton={<DrawerButton color="#fff" />}
            onSearch={setSearchString}>
            <Text style={GST.HEADER_TITLE}>{route.name}</Text>
          </SearchNavHeader>
        );
      },
    });
  }, [navigation, route.name]);

  return (
    <Container>
      <SchoolList
        data={schools}
        fetching={false}
        error={false}
        onItemPress={onSchoolPress}
        onEndReached={() => setPage(n => n + 1)}
        onEndReachedThreshold={0.8}
      />
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

export default MySchools;
