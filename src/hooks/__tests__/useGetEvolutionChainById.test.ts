import {renderHook} from '@testing-library/react-native';
import {useGetEvolutionChainById} from 'hooks/useGetEvolutionChainById';
import {wrapper} from 'utils/QueryClientWrapperForTest';

describe('useGetEvolutionChainById', () => {
  test('should be return data', async () => {
    const {result} = renderHook(
      () =>
        useGetEvolutionChainById({
          id: '1',
        }),
      {wrapper},
    );

    expect(result.current.data).toStrictEqual(undefined);
  });
});
