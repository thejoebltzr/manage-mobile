import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import {COLORS} from '@/src/theme/colors';
import {DrawerProps, ScreenNames} from '@/src/types/navigation';

import Container from '../container';
import {DrawerItem} from './navItems';

const SideBar: FC = () => {
  const {currentSchool} = useAppSelector((state: RootState) => {
    return state.schools;
  });
  const navigation = useNavigation<DrawerProps>();
  return (
    <Container
      style={{backgroundColor: COLORS.TW_GRAY_LIGHT}}
      shouldScroll
      insetRight={false}
      insetTop={true}>
      <DrawerItem
        title={currentSchool?.name || 'Home'}
        iconName="home"
        onPress={() => navigation.navigate(ScreenNames.PostResultStack)}
      />
      <DrawerItem
        title="Announcements"
        icon={<FontAwesome name="bullhorn" />}
        onPress={() => navigation.navigate(ScreenNames.AnnouncementStack)}
      />
      <DrawerItem
        title="My Calendar"
        icon={<AntDesignIcon name="calendar" />}
        onPress={() => navigation.navigate(ScreenNames.MyCalendar)}
      />
      <DrawerItem
        title="Teams"
        icon={<Ionicons name="shirt-outline" />}
        onPress={() => navigation.navigate(ScreenNames.EventStack)}
      />
      <DrawerItem
        title="School Info"
        icon={<MaterialIcons name="info-outline" />}
        onPress={() => navigation.navigate(ScreenNames.SchoolInfo)}
      />
      <DrawerItem
        title="Schools"
        iconName="school"
        onPress={() =>
          navigation.navigate(ScreenNames.SchoolStack, {
            screen: ScreenNames.MySchools,
          })
        }
      />
      <DrawerItem
        title="Settings"
        iconName="settings"
        onPress={() => navigation.navigate(ScreenNames.SettingsStack)}
      />
    </Container>
  );
};

export default SideBar;
