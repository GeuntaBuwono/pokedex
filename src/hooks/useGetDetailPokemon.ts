import {useQuery} from '@tanstack/react-query';
import {axiosInstance} from 'services/axios.base';
import {z} from 'zod';

const ParamsGetPokemonDetailSchema = z.object({
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

const ResponseGetPokemonDetailSchema = z.object({
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
        front_default: z.string().url().nullish(),
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
        name: z.string(),
        url: z.string().url(),
      }),
    }),
  ),
  weight: z.number(),
});

export type ResponseGetDetailPokemon = z.infer<
  typeof ResponseGetPokemonDetailSchema
>;

export function useGetPokemonDetail<
  T extends z.infer<typeof ParamsGetPokemonDetailSchema>,
>(id: T) {
  return useQuery({
    queryKey: ['pokemonDetail', id],
    queryFn: async ({queryKey: [, variables]}) => {
      const {id: keyId} = variables as {id: string};
      const response = await axiosInstance.get(`/pokemon/${keyId}`);
      return ResponseGetPokemonDetailSchema.parse(response.data);
    },
  });
}
