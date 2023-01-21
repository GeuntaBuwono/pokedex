import {ResponseGetPokemonListByType} from 'hooks/useGetPokemonListByType';
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

export const expectedDataListPokemonByType: ResponseGetPokemonListByType = {
  id: 1,
  pokemon: [
    {
      pokemon: {
        name: 'pidgey',
        url: 'https://pokeapi.co/api/v2/pokemon/16/',
      },
      slot: 1,
    },
  ],
  past_damage_relations: [],
  names: [
    {
      name: 'Normal',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
    },
  ],
  name: 'normal',
  moves: [
    {
      name: 'pound',
      url: 'https://pokeapi.co/api/v2/move/1/',
    },
  ],
  damage_relations: {
    no_damage_to: [],
    no_damage_from: [],
    half_damage_to: [],
    half_damage_from: [],
    double_damage_to: [],
    double_damage_from: [],
  },
  game_indices: [
    {
      game_index: 1,
      generation: {
        name: 'generation-i',
        url: 'https://pokeapi.co/api/v2/generation/1/',
      },
    },
  ],
  generation: {
    name: 'generation-i',
    url: 'https://pokeapi.co/api/v2/generation/1/',
  },
  move_damage_class: [
    {
      name: 'physical',
      url: 'https://pokeapi.co/api/v2/move-damage-class/2/',
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
  rest.get('https://pokeapi.co/api/v2/type/1', (req, res, ctx) =>
    res(ctx.json(expectedDataListPokemonByType)),
  ),
];
