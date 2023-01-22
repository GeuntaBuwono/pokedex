import 'react-native';

import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';
import {I18nextProvider} from 'react-i18next';
import HomepageScreen from 'screens/HomepageScreen';

import {mockedNavigate} from '../../../jest/jest.setupFiles';
import i18n from '../../i18n/i18n';

describe('Homepage Screen', () => {
  const wrapper = (
    <I18nextProvider i18n={i18n}>
      <HomepageScreen />
    </I18nextProvider>
  );

  test('renders correctly', () => {
    render(wrapper);
    expect(screen.getByText('Homepage')).toBeTruthy();
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
