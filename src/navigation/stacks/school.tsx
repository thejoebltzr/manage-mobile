import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import AllSchools from '@/src/screens/schools/allSchools';
import MySchools from '@/src/screens/schools/mySchools';
import Teams from '@/src/screens/teams';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';

const Stack = createStackNavigator<ScreenParamList>();

const SchoolStack = () => (
  <Stack.Navigator>
    <Stack.Screen component={MySchools} name={ScreenNames.MySchools} />
    <Stack.Screen component={AllSchools} name={ScreenNames.AllSchools} />
    <Stack.Screen component={Teams} name={ScreenNames.Teams} />
  </Stack.Navigator>
);

export default SchoolStack;
