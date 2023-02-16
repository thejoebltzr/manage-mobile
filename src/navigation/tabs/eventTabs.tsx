import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {StackNavHeader} from '@/src/components/navigation/navHeaders';
import {BackButton} from '@/src/components/navigation/navItems';
import EventNews from '@/src/screens/events/eventNews';
import EventResults from '@/src/screens/events/eventResults';
import EventRoster from '@/src/screens/events/eventRoster';
import EventSchedule from '@/src/screens/events/eventSchedule';
import PhotoGallery from '@/src/screens/photoGallery';
import {COLORS} from '@/src/theme/colors';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';

const Tab = createBottomTabNavigator<ScreenParamList>();

const EventTab = () => (
  <Tab.Navigator
    screenOptions={{
      header: ({navigation, route}) => (
        <StackNavHeader
          title={route.name}
          leftButton={
            <BackButton
              color={COLORS.WHITE}
              onPress={() => navigation.navigate(ScreenNames.Events)}
            />
          }
        />
      ),
    }}>
    <Tab.Screen
      name={ScreenNames.EventSchedule}
      component={EventSchedule}
      options={{
        tabBarLabel: 'Schedule',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({color, size}) => (
          <AntDesignIcon name="calendar" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name={ScreenNames.EventResults}
      component={EventResults}
      options={{
        tabBarLabel: 'Results',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({color, size}) => (
          <SimpleLineIcons name="trophy" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name={ScreenNames.PhotoGallery}
      component={PhotoGallery}
      options={{
        tabBarLabel: 'Gallery',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({color, size}) => (
          <AntDesignIcon name="picture" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name={ScreenNames.Roster}
      component={EventRoster}
      options={{
        tabBarLabel: 'Roster',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({color, size}) => (
          <SimpleLineIcons name="people" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name={ScreenNames.TeamNews}
      component={EventNews}
      options={{
        tabBarLabel: 'News',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({color, size}) => (
          <FontAwesome5 name="bullhorn" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default EventTab;
