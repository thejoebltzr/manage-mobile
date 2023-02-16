import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Login from '@/src/screens/login';
import AllSchools from '@/src/screens/schools/allSchools';
import Splash from '@/src/screens/splash';
import Teams from '@/src/screens/teams';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';

const Stack = createStackNavigator<ScreenParamList>();
const AuthStack = () => (
  <Stack.Navigator initialRouteName={ScreenNames.Splash}>
    <Stack.Screen
      name={ScreenNames.Login}
      component={Login}
      options={{headerTitle: 'Coach Login'}}
    />
    <Stack.Screen name={ScreenNames.Splash} component={Splash} />
    <Stack.Screen name={ScreenNames.AllSchools} component={AllSchools} />
    <Stack.Screen name={ScreenNames.Teams} component={Teams} />
  </Stack.Navigator>
);

export default AuthStack;
