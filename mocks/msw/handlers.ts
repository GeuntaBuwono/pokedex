import {ResponseGetPokemonList} from 'hooks/useGetPokemonList';
import {rest} from 'msw';

const expectedData: ResponseGetPokemonList = {
  count: 20,
  previous: null,
  next: 'https://pokeapi.co/api/v2/ability?offset=20&limit=20',
  results: [
    {
      name: 'pikacu',
      url: 'https://pokeapi.co/api/v2/ability/1/',
    },
  ],
};

export const handlers = [
  rest.get('https://pokeapi.co/api/v2', (req, res, ctx) =>
    res(
      ctx.json({
        message: 'success',
      }),
    ),
  ),
  rest.get('https://pokeapi.co/api/v2/ability', (req, res, ctx) => {
    const offset = req.url.searchParams.get('offset');
    const limit = req.url.searchParams.get('limit');

    return res(
      ctx.json({
        ...expectedData,
        next: `https://pokeapi.co/api/v2/ability?offset=${offset || 20}&limit=${
          limit || 20
        }`,
      }),
    );
  }),
];
