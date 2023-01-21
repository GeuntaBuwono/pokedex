import {renderHook, waitFor} from '@testing-library/react-native';
import {
  ResponseGetPokemonList,
  useGetPokemonList,
} from 'hooks/useGetPokemonList';
import {wrapper} from 'utils/QueryClientWrapperForTest';

const expectedData: ResponseGetPokemonList = {
  count: 20,
  next: 'https://pokeapi.co/api/v2/ability?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'pikacu',
      url: 'https://pokeapi.co/api/v2/ability/1/',
    },
  ],
};

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
        ...expectedData,
        next: 'https://pokeapi.co/api/v2/ability?offset=1&limit=1',
      }),
    );
  });

  test('should be return data', async () => {
    const {result} = renderHook(() => useGetPokemonList(), {wrapper});

    await waitFor(() =>
      expect(result.current.data).toStrictEqual(expectedData),
    );
  });
});
