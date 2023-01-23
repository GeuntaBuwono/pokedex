import 'react-native';
import 'jest-styled-components/native';

import {NavigationContainer} from '@react-navigation/native';
import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';
import {AppStackNavigator} from 'screens/AppStackNavigator';
import TestingWrapper from 'utils/TestingWrapper';

import {mockedNavigate} from '../../../jest/jest.setupFiles';

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

  test('right header correctly', () => {
    render(component);

    fireEvent.press(screen.getByTestId('rightHeader'));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });
});
