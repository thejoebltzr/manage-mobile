import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import PostResultDetails from '@/src/screens/postResultDetails';
import PostResultsDetailsConfirmation from '@/src/screens/postResultDetailsConfirmation';
import PostResults from '@/src/screens/postResults';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
const Stack = createStackNavigator<ScreenParamList>();

const PostResultStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={ScreenNames.PostResults} component={PostResults} />
    <Stack.Screen
      name={ScreenNames.PostResultDetails}
      component={PostResultDetails}
      options={{headerTintColor: '#475294'}}
    />
    <Stack.Screen
      name={ScreenNames.PostResultDetailsConfirmation}
      component={PostResultsDetailsConfirmation}
    />
  </Stack.Navigator>
);

export default PostResultStack;
