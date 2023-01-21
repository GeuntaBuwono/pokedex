import 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {render, screen} from '@testing-library/react-native';
import React from 'react';
import {AppStackNavigator} from 'screens/AppStackNavigator';

// Note: test renderer must be required after react-native.
describe('App Stack Navigator', () => {
  test('renders correctly', () => {
    const component = (
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    );

    render(component);
    expect(screen.getByText('Homepage')).toBeTruthy();
  });
});
