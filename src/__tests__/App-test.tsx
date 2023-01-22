import 'react-native';

import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByText('Homepage')).toBeTruthy();
  });

  it('theming correctly', () => {
    render(<App />);
    expect(screen.getByText('Light Theme')).toBeTruthy();
    fireEvent.press(screen.getByText('Change Theme'));
    expect(screen.getByText('Dark Theme')).toBeTruthy();
  });
});
