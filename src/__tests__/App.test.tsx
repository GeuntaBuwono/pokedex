import {
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {useGetPokemonList} from 'hooks/useGetPokemonList';
import React from 'react';
import {wrapper} from 'utils/QueryClientWrapperForTest';

import App from '../App';

describe('App', () => {
  const component = <App />;

  test('renders correctly', async () => {
    render(component);

    const {result} = renderHook(
      () => useGetPokemonList({limit: 5, offset: 5}),
      {wrapper},
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(
        screen.findByText('Thousands of data compiled into one place'),
      ).toBeTruthy();
    });
  });
});
