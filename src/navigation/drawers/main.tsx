import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

import {DrawerNavHeader} from '@/src/components/navigation/navHeaders';
import SideBar from '@/src/components/navigation/sideBar';
import {useOrientation} from '@/src/hooks/useOrientation';
import Announcements from '@/src/screens/announcements';
import Login from '@/src/screens/login';
import MyCalendar from '@/src/screens/myCalendar';
import SchoolInfo from '@/src/screens/schoolInfo';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';

import AnnouncementStack from '../stacks/announcement';
import EventStack from '../stacks/event';
import PostResultStack from '../stacks/postResult';
import SchoolStack from '../stacks/school';
import SettingsStack from '../stacks/settings';

const Drawer = createDrawerNavigator<ScreenParamList>();

const MainDrawer = () => {
  const orientation = useOrientation();
  return (
    <Drawer.Navigator
      drawerContent={() => <SideBar />}
      screenOptions={{
        header: ({route}) => <DrawerNavHeader title={route.name} />,
        drawerType: orientation === 'PORTRAIT' ? 'front' : 'permanent',
      }}>
      <Drawer.Screen
        name={ScreenNames.PostResultStack}
        component={PostResultStack}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={ScreenNames.AnnouncementStack}
        component={AnnouncementStack}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={ScreenNames.EventStack}
        component={EventStack}
        options={{headerShown: false}}
      />
      <Drawer.Screen name={ScreenNames.MyCalendar} component={MyCalendar} />
      <Drawer.Screen name={ScreenNames.SchoolInfo} component={SchoolInfo} />
      <Drawer.Screen
        name={ScreenNames.SchoolStack}
        component={SchoolStack}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={ScreenNames.SettingsStack}
        component={SettingsStack}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={ScreenNames.Announcements}
        component={Announcements}
      />
      <Drawer.Screen name={ScreenNames.Login} component={Login} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
