import {axiosInstance} from 'services/axios.base';

describe('Axios Instance', () => {
  test('should be called instance', async () => {
    const axiosInstanceBaseUrl = await axiosInstance.get(
      'https://pokeapi.co/api/v2',
    );

    expect(axiosInstanceBaseUrl.status).toStrictEqual(200);
  });
});
