/* eslint-disable sonarjs/no-duplicate-string */
import {ResponseGetPokemonListByType} from 'hooks/useGetPokemonListByType';
import {rest} from 'msw';
import {
  PokemonSpecies,
  ResponseGetPokemonDetail,
  ResponseGetPokemonList,
} from 'schema/PokemonSchema';

export const expectedDataListPokemon: ResponseGetPokemonList = {
  count: 20,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'spearow',
      url: 'https://pokeapi.co/api/v2/pokemon/21/',
    },
  ],
};

export const expectedDataListPokemonType: ResponseGetPokemonList = {
  count: 20,
  next: null,
  previous: null,
  results: [
    {
      name: 'normal',
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
};

export const expectDataDetailPokemon: ResponseGetPokemonDetail = {
  abilities: [
    {
      ability: {
        name: 'static',
        url: 'https://pokeapi.co/api/v2/ability/9/',
      },
      is_hidden: false,
      slot: 1,
    },
  ],
  base_experience: 112,
  forms: [
    {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon-form/25/',
    },
  ],
  game_indices: [
    {
      game_index: 84,
      version: {
        name: 'red',
        url: 'https://pokeapi.co/api/v2/version/1/',
      },
    },
  ],
  height: 4,
  held_items: [
    {
      item: {
        name: 'oran-berry',
        url: 'https://pokeapi.co/api/v2/item/132/',
      },
      version_details: [
        {
          rarity: 50,
          version: {
            name: 'ruby',
            url: 'https://pokeapi.co/api/v2/version/7/',
          },
        },
      ],
    },
  ],
  id: 25,
  is_default: true,
  location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/25/encounters',
  moves: [
    {
      move: {
        name: 'mega-punch',
        url: 'https://pokeapi.co/api/v2/move/5/',
      },
      version_group_details: [
        {
          level_learned_at: 0,
          move_learn_method: {
            name: 'machine',
            url: 'https://pokeapi.co/api/v2/move-learn-method/4/',
          },
          version_group: {
            name: 'red-blue',
            url: 'https://pokeapi.co/api/v2/version-group/1/',
          },
        },
      ],
    },
  ],
  name: 'pikachu',
  order: 35,
  past_types: [],
  species: {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
  },
  sprites: {
    back_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
    back_female:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/25.png',
    back_shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png',
    back_shiny_female:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/25.png',
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    front_female:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/25.png',
    front_shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png',
    front_shiny_female:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/25.png',
    other: {
      dream_world: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
        front_female: null,
      },
      home: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png',
        front_female:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/female/25.png',
        front_shiny:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/25.png',
        front_shiny_female:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/female/25.png',
      },
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        front_shiny:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/25.png',
      },
    },
    versions: {
      'generation-i': {
        yellow: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        },
      },
      'generation-ii': {
        gold: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        },
      },
      'generation-iii': {
        emerald: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        },
      },
      'generation-iv': {
        'diamond-pearl': {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        },
      },
      'generation-v': {
        'black-white': {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        },
      },
      'generation-vi': {
        'omegaruby-alphasapphire': {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        },
      },
    },
  },
  stats: [
    {
      base_stat: 35,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/',
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
  weight: 60,
};

const expectedPokemonSpecies: PokemonSpecies = {
  evolution_chain: {
    url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
  },
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
    /* istanbul ignore next */
    const offset = req.url.searchParams.get('offset') || 20;
    /* istanbul ignore next */
    const limit = req.url.searchParams.get('limit') || 20;

    return res(
      ctx.json({
        ...expectedDataListPokemon,
        next: `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      }),
    );
  }),
  rest.get('https://pokeapi.co/api/v2/pokemon/1', (req, res, ctx) =>
    res(ctx.json(expectDataDetailPokemon)),
  ),
  rest.get('https://pokeapi.co/api/v2/type', (req, res, ctx) =>
    res(ctx.json(expectedDataListPokemonType)),
  ),
  rest.get('https://pokeapi.co/api/v2/type/normal', (req, res, ctx) =>
    res(ctx.json(expectedDataListPokemonByType)),
  ),
  rest.get('https://pokeapi.co/api/v2/pokemon-species/1', (req, res, ctx) =>
    res(ctx.json(expectedPokemonSpecies)),
  ),
];
