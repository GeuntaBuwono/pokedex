import {rest} from 'msw';
import {ResponseGetPokemonList} from 'schema/PokemonSchema';

export const expectedDataListPokemon: ResponseGetPokemonList = {
  count: 20,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'pikacu',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
  ],
};

export const expectedDataListPokemonType: ResponseGetPokemonList = {
  count: 20,
  next: null,
  previous: null,
  results: [
    {
      name: 'pikacu',
      url: 'https://pokeapi.co/api/v2/type/1/',
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
  rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
    const offset = req.url.searchParams.get('offset') || 20;
    const limit = req.url.searchParams.get('limit') || 20;

    return res(
      ctx.json({
        ...expectedDataListPokemon,
        next: `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      }),
    );
  }),
  rest.get('https://pokeapi.co/api/v2/type', (req, res, ctx) =>
    res(ctx.json(expectedDataListPokemonType)),
  ),
];
