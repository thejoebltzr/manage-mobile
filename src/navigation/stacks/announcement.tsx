import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import AnnouncementDetails from '@/src/screens/announcementDetails';
import Announcements from '@/src/screens/announcements';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';

const Stack = createNativeStackNavigator<ScreenParamList>();
const AnnouncementStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={ScreenNames.Announcements} component={Announcements} />
    <Stack.Screen
      name={ScreenNames.AnnouncementDetails}
      component={AnnouncementDetails}
    />
  </Stack.Navigator>
);

export default AnnouncementStack;
