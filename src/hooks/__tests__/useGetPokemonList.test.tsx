import {renderHook, waitFor} from '@testing-library/react-native';
import {useGetPokemonList} from 'hooks/useGetPokemonList';
import {wrapper} from 'utils/QueryClientWrapperForTest';

import {expectedDataListPokemon} from '../../../mocks/msw/handlers';

describe('useGetListPokemon', () => {
  test('should be called', async () => {
    const {result} = renderHook(() => useGetPokemonList(), {wrapper});

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('fetch with params', async () => {
    const {result} = renderHook(
      () => useGetPokemonList({limit: 1, offset: 1}),
      {wrapper},
    );

    await waitFor(() =>
      expect(result.current.data).toStrictEqual({
        ...expectedDataListPokemon,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=1&limit=1',
      }),
    );
  });

  test('should be return data', async () => {
    const {result} = renderHook(() => useGetPokemonList(), {wrapper});

    await waitFor(() =>
      expect(result.current.data).toStrictEqual(expectedDataListPokemon),
    );
  });
});
