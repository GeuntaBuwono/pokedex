import {useQuery} from '@tanstack/react-query';
import {axiosInstance} from 'services/axios.base';
import {z} from 'zod';

const ParamsGetPokemonDetailSchema = z.object({
  id: z.string(),
});

const PokemonVersionSchema = z.record(
  z.string(),
  z.record(z.string(), z.record(z.string(), z.string())),
);

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
    back_default: z.string().url(),
    back_female: z.string().url(),
    back_shiny: z.string().url(),
    back_shiny_female: z.string().url(),
    front_default: z.string().url(),
    front_female: z.string().url(),
    front_shiny: z.string().url(),
    front_shiny_female: z.string().url(),
    other: z.object({
      dream_world: z.object({
        front_default: z.string().url(),
        front_female: z.string().url().nullable(),
      }),
      home: z.object({
        front_default: z.string().url(),
        front_female: z.string().url(),
        front_shiny: z.string().url(),
        front_shiny_female: z.string().url(),
      }),
      'official-artwork': z.object({
        front_default: z.string().url(),
        front_shiny: z.string().url(),
      }),
    }),
    versions: PokemonVersionSchema,
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
