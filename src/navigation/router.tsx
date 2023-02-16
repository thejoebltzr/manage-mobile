import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {useAppSelector} from '../hooks/store';
import {RootState} from '../store';
import MainDrawer from './drawers/main';
import AuthStack from './stacks/auth';

const NavigationRouter = () => {
  const {isInitialized} = useAppSelector((state: RootState) => {
    return state.user;
  });
  return (
    <NavigationContainer>
      {!isInitialized ? <AuthStack /> : <MainDrawer />}
    </NavigationContainer>
  );
};

export default NavigationRouter;
