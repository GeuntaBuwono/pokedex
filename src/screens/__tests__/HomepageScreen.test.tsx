import 'react-native';

import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';
import HomepageScreen from 'screens/HomepageScreen';

import {mockedNavigate} from '../../../jest/jest.setupFiles';

describe('Homepage Screen', () => {
  test('renders correctly', () => {
    render(<HomepageScreen />);
    expect(screen.getByText('Homepage')).toBeTruthy();

    fireEvent.press(screen.getByText('Go To Type Pokemon'));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);

    fireEvent.press(screen.getByText('Go To Detail Pikachu'));
    expect(mockedNavigate).toHaveBeenCalledTimes(2);
  });
});
