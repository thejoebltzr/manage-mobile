import {NavigationContainer} from '@react-navigation/native';
import {render, screen} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';

import SchoolStack from '@/src/navigation/stacks/school';
import store from '@/src/store';

describe('Edit team screen test', () => {
  it('adds a new team to store', async () => {
    const component = (
      <Provider store={store}>
        <NavigationContainer>
          <SchoolStack />
        </NavigationContainer>
      </Provider>
    );

    render(component);
    const header = await screen.findByText('My Schools');

    expect(header).toBeTruthy();
  });
});
