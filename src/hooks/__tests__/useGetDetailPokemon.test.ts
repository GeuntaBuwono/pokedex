import {renderHook, waitFor} from '@testing-library/react-native';
import {useGetPokemonDetail} from 'hooks/useGetDetailPokemon';
import {wrapper} from 'utils/QueryClientWrapperForTest';

import {expectDataDetailPokemon} from '../../../mocks/msw/handlers';

describe('useGetDetailPokemon', () => {
  test('should be return data', async () => {
    const {result} = renderHook(
      () =>
        useGetPokemonDetail({
          id: 'pikachu',
        }),
      {wrapper},
    );

    await waitFor(() =>
      expect(result.current.data).toStrictEqual(expectDataDetailPokemon),
    );
  });
});
