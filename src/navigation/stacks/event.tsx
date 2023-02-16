import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Events from '@/src/screens/events';
import EventDetails from '@/src/screens/events/eventDetails';
import PostResultDetails from '@/src/screens/postResultDetails';
import Teams from '@/src/screens/teams';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';

import EventTab from '../tabs/eventTabs';

const Stack = createStackNavigator<ScreenParamList>();

const EventStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={ScreenNames.Events} component={Events} />
    <Stack.Screen
      name={ScreenNames.TeamEvents}
      component={EventTab}
      options={{headerShown: false}}
    />
    <Stack.Screen name={ScreenNames.EventDetails} component={EventDetails} />
    <Stack.Screen
      name={ScreenNames.PostResultDetails}
      component={PostResultDetails}
    />
    <Stack.Screen name={ScreenNames.Teams} component={Teams} />
  </Stack.Navigator>
);

export default EventStack;
