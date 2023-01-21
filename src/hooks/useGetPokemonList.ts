import {useQuery} from '@tanstack/react-query';
import {axiosInstance} from 'services/axios.base';
import {z} from 'zod';

const ParamsGetPokemonListSchema = z.object({
  offset: z.number().optional(),
  limit: z.number().optional(),
});

const PokemonItemSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

const ResponseGetPokemonListSchema = z.object({
  count: z.number(),
  next: z.nullable(z.string().url()),
  previous: z.nullable(z.string().url()),
  results: z.array(PokemonItemSchema),
});

export type ResponseGetPokemonList = z.infer<
  typeof ResponseGetPokemonListSchema
>;

export function useGetPokemonList<
  T extends z.infer<typeof ParamsGetPokemonListSchema>,
>(params?: T) {
  return useQuery({
    queryKey: ['pokemonList'],
    queryFn: async () => {
      const response = await axiosInstance.get('/ability', {
        params,
      });
      return ResponseGetPokemonListSchema.parse(response.data);
    },
  });
}
