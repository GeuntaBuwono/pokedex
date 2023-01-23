import 'react-native';

import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';
import HomepageScreen from 'screens/HomepageScreen';
import TestingWrapper from 'utils/TestingWrapper';

import {mockedNavigate} from '../../../jest/jest.setupFiles';

describe('Homepage Screen', () => {
  const wrapper = (
    <TestingWrapper>
      <HomepageScreen />
    </TestingWrapper>
  );

  test('renders correctly', () => {
    render(wrapper);
    expect(
      screen.getByText('Thousands of data compiled into one place'),
    ).toBeTruthy();
  });

  test('navigation button', () => {
    render(wrapper);

    fireEvent.press(screen.getByText('Go To Type Pokemon'));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);

    fireEvent.press(screen.getByText('Go To Detail Pikachu'));
    expect(mockedNavigate).toHaveBeenCalledTimes(2);
  });

  test('themeing correctly', () => {
    render(wrapper);
    expect(screen.getByText('Light Theme')).toBeTruthy();
    fireEvent.press(screen.getByText('Change Theme'));
    expect(screen.getByText('Dark Theme')).toBeTruthy();
  });
});
