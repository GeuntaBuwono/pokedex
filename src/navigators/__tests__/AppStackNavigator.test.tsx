import 'jest-styled-components/native';
import 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {render, screen} from '@testing-library/react-native';
import {AppStackNavigator} from 'navigators/AppStackNavigator';
import React from 'react';
import TestingWrapper from 'utils/TestingWrapper';

describe('App Stack Navigator', () => {
  const component = (
    <TestingWrapper>
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    </TestingWrapper>
  );

  test('renders correctly', () => {
    render(component);
    expect(
      screen.getByText('Thousands of data compiled into one place'),
    ).toBeTruthy();
  });
});
