import getJsonFromUrl from 'utils/getJsonFromUrl';

describe('getJsonFromUrl', () => {
  test('functions correctly', () => {
    const testUrl = 'https://pokeapi.co/api/v2/pokemon?offset=210&limit=5';

    const {limit, offset} = getJsonFromUrl({
      url: testUrl,
    }) as {offset: number; limit: number};

    expect(limit).toStrictEqual('5');
    expect(offset).toStrictEqual('210');
  });
});
