import {z} from 'zod';

const ParamsGetPokemonListSchema = z.object({
  offset: z.number().optional(),
  limit: z.number().optional(),
});

export const PokemonResultsSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export const ResponseGetPokemonListSchema = z.object({
  count: z.number(),
  next: z.nullable(z.string().url()),
  previous: z.nullable(z.string().url()),
  results: z.array(PokemonResultsSchema),
});

export type ParamsGetPokemonList = z.infer<typeof ParamsGetPokemonListSchema>;
export type PokemonResults = z.infer<typeof PokemonResultsSchema>;
export type ResponseGetPokemonList = z.infer<
  typeof ResponseGetPokemonListSchema
>;

export const ParamsGetPokemonDetailSchema = z.object({
  id: z.string(),
});

const PokemonImageSchema = z.object({
  back_default: z.string().url().nullish(),
  back_gray: z.string().url().nullish(),
  back_transparent: z.string().url().nullish(),
  front_default: z.string().url().nullish(),
  front_gray: z.string().url().nullish(),
  front_transparent: z.string().url().nullish(),
});

const PokemonTypeSchema = z.enum([
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'bug',
  'ghost',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
  'shadow',
  'steel',
]);

export type PokemonType = z.infer<typeof PokemonTypeSchema>;

export const ResponseGetPokemonDetailSchema = z.object({
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
      is_hidden: z.boolean(),
      slot: z.number(),
    }),
  ),
  base_experience: z.number(),
  forms: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
    }),
  ),
  game_indices: z.array(
    z.object({
      game_index: z.number(),
      version: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
    }),
  ),
  height: z.number(),
  held_items: z.array(
    z.object({
      item: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
      version_details: z.array(
        z.object({
          rarity: z.number(),
          version: z.object({
            name: z.string(),
            url: z.string().url(),
          }),
        }),
      ),
    }),
  ),
  id: z.number(),
  is_default: z.boolean(),
  location_area_encounters: z.string().url(),
  moves: z.array(
    z.object({
      move: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
      version_group_details: z.array(
        z.object({
          level_learned_at: z.number(),
          move_learn_method: z.object({
            name: z.string(),
            url: z.string().url(),
          }),
          version_group: z.object({
            name: z.string(),
            url: z.string().url(),
          }),
        }),
      ),
    }),
  ),
  name: z.string(),
  order: z.number(),
  past_types: z.unknown().array(),
  species: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
  sprites: z.object({
    back_default: z.string().url().nullish(),
    back_female: z.string().url().nullish(),
    back_shiny: z.string().url().nullish(),
    back_shiny_female: z.string().url().nullish(),
    front_default: z.string().url().nullish(),
    front_female: z.string().url().nullish(),
    front_shiny: z.string().url().nullish(),
    front_shiny_female: z.string().url().nullish(),
    other: z.object({
      dream_world: z.object({
        front_default: z.string().url().nullish(),
        front_female: z.string().url().nullish(),
      }),
      home: z
        .object({
          front_default: z.string().url().nullish(),
          front_female: z.string().url().nullish(),
          front_shiny: z.string().url().nullish(),
          front_shiny_female: z.string().url().nullish(),
        })
        .nullable(),
      'official-artwork': z.object({
        front_default: z.string().url(),
        front_shiny: z.string().url().nullish(),
      }),
    }),
    versions: z.object({
      'generation-i': z.object({
        yellow: PokemonImageSchema,
      }),
      'generation-ii': z.object({
        gold: PokemonImageSchema,
      }),
      'generation-iii': z.object({
        emerald: PokemonImageSchema,
      }),
      'generation-iv': z.object({
        'diamond-pearl': PokemonImageSchema,
      }),
      'generation-v': z.object({
        'black-white': PokemonImageSchema,
      }),
      'generation-vi': z.object({
        'omegaruby-alphasapphire': PokemonImageSchema,
      }),
    }),
  }),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      effort: z.number(),
      stat: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
    }),
  ),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: PokemonTypeSchema,
        url: z.string().url(),
      }),
    }),
  ),
  weight: z.number(),
});

export type ResponseGetPokemonDetail = z.infer<
  typeof ResponseGetPokemonDetailSchema
>;

export const TransformedResponseEvolution = z.array(
  z.object({
    species_name: z.string(),
  }),
);

export type EvoDataType = {
  species: {
    name: string;
  };
  evolution_details: Array<{
    min_level: number;
    trigger: {name: string};
    item: string;
  }>;
  evolves_to: Array<EvoDataType>;
};

const PokemonSpeciesSchema = z.object({
  evolution_chain: z.object({
    url: z.string().url(),
  }),
});

export type PokemonSpecies = z.infer<typeof PokemonSpeciesSchema>;
