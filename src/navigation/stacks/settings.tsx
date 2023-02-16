import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import login from '@/src/screens/login';
import AllSchools from '@/src/screens/schools/allSchools';
import settings from '@/src/screens/settings';
import Teams from '@/src/screens/teams';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';

const Stack = createStackNavigator<ScreenParamList>();

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen component={settings} name={ScreenNames.Settings} />
    <Stack.Screen component={AllSchools} name={ScreenNames.AllSchools} />
    <Stack.Screen component={Teams} name={ScreenNames.Teams} />
    <Stack.Screen component={login} name={ScreenNames.Login} />
  </Stack.Navigator>
);

export default SettingsStack;
