import {useQuery} from '@tanstack/react-query';
import {ResponseGetPokemonListSchema} from 'schema/PokemonSchema';
import {axiosInstance} from 'services/axios.base';
import {z} from 'zod';

const ParamsGetPokemonListSchema = z.object({
  offset: z.number().optional(),
  limit: z.number().optional(),
});

export function useGetPokemonList<
  T extends z.infer<typeof ParamsGetPokemonListSchema>,
>(params?: T) {
  return useQuery({
    queryKey: ['pokemon'],
    queryFn: async () => {
      const response = await axiosInstance.get('/pokemon', {
        params,
      });
      return ResponseGetPokemonListSchema.parse(response.data);
    },
  });
}
