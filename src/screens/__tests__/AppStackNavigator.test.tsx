import 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {render, screen} from '@testing-library/react-native';
import React from 'react';
import {AppStackNavigator} from 'screens/AppStackNavigator';
import TestingWrapper from 'utils/TestingWrapper';

// Note: test renderer must be required after react-native.
describe('App Stack Navigator', () => {
  test('renders correctly', () => {
    const component = (
      <TestingWrapper>
        <NavigationContainer>
          <AppStackNavigator />
        </NavigationContainer>
      </TestingWrapper>
    );

    render(component);
    expect(
      screen.getByText('Thousands of data compiled into one place'),
    ).toBeTruthy();
  });
});
