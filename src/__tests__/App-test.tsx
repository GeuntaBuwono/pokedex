import 'react-native';

import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';
import TestingWrapper from 'utils/TestingWrapper';

// Note: test renderer must be required after react-native.
import App from '../App';

describe('App', () => {
  const wrapper = (
    <TestingWrapper>
      <App />
    </TestingWrapper>
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
