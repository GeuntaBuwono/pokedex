import {render, screen, waitFor} from '@testing-library/react-native';
import React from 'react';

import App from '../App';

describe('App', () => {
  const component = <App />;

  test('renders correctly', async () => {
    render(component);

    await waitFor(() => {
      expect(
        screen.findByText('Thousands of data compiled into one place'),
      ).toBeTruthy();
    });
  });
});
