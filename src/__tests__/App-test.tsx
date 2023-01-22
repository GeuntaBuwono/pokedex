import 'react-native';

import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';
import {I18nextProvider} from 'react-i18next';

// Note: test renderer must be required after react-native.
import App from '../App';
import i18n from '../i18n/i18n';

describe('App', () => {
  const wrapper = (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
  it('renders correctly', () => {
    render(wrapper);
    expect(screen.getByText('Homepage')).toBeTruthy();
  });

  it('theming correctly', () => {
    render(wrapper);
    expect(screen.getByText('Light Theme')).toBeTruthy();
    fireEvent.press(screen.getByText('Change Theme'));
    expect(screen.getByText('Dark Theme')).toBeTruthy();
  });
});
