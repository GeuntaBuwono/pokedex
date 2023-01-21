import 'react-native';

import {render, screen} from '@testing-library/react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByText('Homepage')).toBeTruthy();
  });
});
