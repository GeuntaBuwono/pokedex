import {QueryKey, useQuery} from '@tanstack/react-query';
import {PokemonResultsSchema} from 'schema/PokemonSchema';
import {axiosInstance} from 'services/axios.base';
import {z} from 'zod';

const ParamsGetPokemonListByTypeSchema = z.object({
  id: z.string(),
});

const ResponseGetPokemonListByTypeSchema = z.object({
  damage_relations: z.object({
    double_damage_from: PokemonResultsSchema.optional().array(),
    double_damage_to: PokemonResultsSchema.optional().array(),
    half_damage_from: PokemonResultsSchema.optional().array(),
    half_damage_to: PokemonResultsSchema.optional().array(),
    no_damage_from: PokemonResultsSchema.optional().array(),
    no_damage_to: PokemonResultsSchema.optional().array(),
  }),
  game_indices: z.array(
    z.object({
      game_index: z.number(),
      generation: PokemonResultsSchema,
    }),
  ),
  generation: PokemonResultsSchema,
  id: z.number(),
  move_damage_class: PokemonResultsSchema.optional().array(),
  moves: PokemonResultsSchema.optional().array(),
  name: z.string(),
  names: z.array(
    z.object({
      language: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
      name: z.string(),
    }),
  ),
  past_damage_relations: z.array(z.undefined()),
  pokemon: z.array(
    z.object({
      pokemon: PokemonResultsSchema,
      slot: z.number(),
    }),
  ),
});

export type ResponseGetPokemonListByType = z.infer<
  typeof ResponseGetPokemonListByTypeSchema
>;

export function useGetPokemonListByType<
  T extends z.infer<typeof ParamsGetPokemonListByTypeSchema>,
>(id: T) {
  return useQuery<unknown, Error, unknown, QueryKey>({
    queryKey: ['pokemonListByType', id],
    queryFn: async ({queryKey: [, variables]}) => {
      const {id: keyId} = variables as {id: string};
      const response = await axiosInstance.get(`/type/${keyId}`);
      return ResponseGetPokemonListByTypeSchema.parse(response.data);
    },
  });
}
