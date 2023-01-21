import {renderHook, waitFor} from '@testing-library/react-native';
import {useGetPokemonListByType} from 'hooks/useGetPokemonListByType';
import {wrapper} from 'utils/QueryClientWrapperForTest';

import {expectedDataListPokemonByType} from '../../../mocks/msw/handlers';

describe('useGetListPokemonByType', () => {
  test('should be return data', async () => {
    const {result} = renderHook(
      () =>
        useGetPokemonListByType({
          id: '1',
        }),
      {wrapper},
    );

    await waitFor(() =>
      expect(result.current.data).toStrictEqual(expectedDataListPokemonByType),
    );
  });
});
