import {DrawerScreenProps} from '@react-navigation/drawer';
import {ListItem} from '@rneui/themed';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Container from '@/src/components/container';
import {DrawerNavHeader} from '@/src/components/navigation/navHeaders';
import {SettingCard} from '@/src/components/settings';
import Text from '@/src/components/text';
import {useAppDispatch, useAppSelector} from '@/src/hooks/store';
import {persistor, RootState} from '@/src/store';
import {clearState} from '@/src/store/reducers';
import {resetUserState} from '@/src/store/reducers/userReducer';
import {selectStyle} from '@/src/theme/responsive';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';

type SettingsProps = DrawerScreenProps<ScreenParamList, ScreenNames.Settings>;

const Settings = ({navigation, route}: SettingsProps) => {
  const {userType} = useAppSelector((state: RootState) => {
    return state.user;
  });
  const dispatch = useAppDispatch();

  // attach the custom header
  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return <DrawerNavHeader title={route.name} />;
      },
    });
  }, [navigation, route.name]);
  return (
    <Container
      shouldScroll
      contentContainerStyle={selectStyle({
        large: lgStyles.container,
        default: {},
      })}>
      <SettingCard
        title="Add Teams"
        iconName="shirt-outline"
        buttonText="Edit teams"
        onButtonPress={() => navigation.navigate(ScreenNames.Teams)}>
        <Text style={styles.cardText}>Edit your list of selected teams</Text>
      </SettingCard>

      <SettingCard
        title="Add School"
        iconName="school-outline"
        buttonText="Add another school"
        onButtonPress={() => navigation.navigate(ScreenNames.AllSchools)}>
        <Text style={styles.cardText}>Add teams from another school</Text>
      </SettingCard>

      {userType === 'parent' ? (
        <SettingCard
          title="Coach"
          icon={<MaterialCommunityIcon name="whistle-outline" />}
          buttonText="Enable coach features"
          onButtonPress={() => navigation.navigate(ScreenNames.Login)}>
          <Text style={styles.cardText}>Enable new coach features</Text>
        </SettingCard>
      ) : (
        <SettingCard
          title="Coach"
          icon={<MaterialCommunityIcon name="whistle-outline" />}
          buttonText="Logout"
          onButtonPress={() => {
            dispatch(resetUserState({}));
          }}>
          <Text style={styles.cardText}>Disable all coach features</Text>
        </SettingCard>
      )}

      <SettingCard
        title="Reset App"
        iconName="reload"
        buttonText="Clear all data"
        onButtonPress={() => {
          persistor.purge().then(() => {
            dispatch(clearState());
            persistor.persist();
          });
        }}>
        <Text style={styles.cardText}>
          Clearing your data will remove your school and team selections and
          reset the Snap Manage app to its initial state
        </Text>
      </SettingCard>

      <SettingCard title="About" icon={<FeatherIcon name="info" />}>
        <ListItem>
          <Text style={styles.aboutKey}>version</Text>
          <Text style={styles.aboutValue}>1</Text>
        </ListItem>
        <ListItem>
          <Text style={styles.aboutKey}>build</Text>
          <Text style={styles.aboutValue}>1</Text>
        </ListItem>
        <ListItem>
          <Text style={styles.aboutKey}>Privacy Policy</Text>
        </ListItem>
      </SettingCard>
    </Container>
  );
};

const styles = StyleSheet.create({
  aboutKey: {
    textAlign: 'left',
    flexGrow: 1,
    fontSize: 16,
  },
  aboutValue: {
    textAlign: 'right',
    fontSize: 16,
  },
  cardText: {
    fontSize: 16,
  },
});

const lgStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});

export default Settings;
