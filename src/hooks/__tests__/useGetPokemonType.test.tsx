import {renderHook, waitFor} from '@testing-library/react-native';
import {useGetPokemonType} from 'hooks/useGetPokemonType';
import {wrapper} from 'utils/QueryClientWrapperForTest';

import {expectedDataListPokemonType} from '../../../mocks/msw/handlers';

describe('useGetListPokemonType', () => {
  test('should be called', async () => {
    const {result} = renderHook(() => useGetPokemonType(), {wrapper});

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('should be return data', async () => {
    const {result} = renderHook(() => useGetPokemonType(), {wrapper});

    await waitFor(() =>
      expect(result.current.data).toStrictEqual(expectedDataListPokemonType),
    );
  });
});
