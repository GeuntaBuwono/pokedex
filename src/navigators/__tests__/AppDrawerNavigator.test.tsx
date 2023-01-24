import 'jest-styled-components/native';
import 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {fireEvent, render, screen} from '@testing-library/react-native';
import AppDrawerNavigator from 'navigators/AppDrawerNavigator';
import React from 'react';
import TestingWrapper from 'utils/TestingWrapper';

describe('App Drawer Navigator', () => {
  const component = (
    <TestingWrapper>
      <NavigationContainer>
        <AppDrawerNavigator />
      </NavigationContainer>
    </TestingWrapper>
  );

  test('renders correctly', () => {
    render(component);
    expect(
      screen.getByText('Thousands of data compiled into one place'),
    ).toBeTruthy();
  });

  test('navigation theme correctly', () => {
    render(component);
    expect(screen.getByTestId('scrollViewLayout')).toHaveStyleRule(
      'background-color',
      '#fff',
    );
    fireEvent.press(screen.getByTestId('leftHeader'));
    expect(screen.getByTestId('scrollViewLayout')).toHaveStyleRule(
      'background-color',
      '#fff',
    );
  });
});
