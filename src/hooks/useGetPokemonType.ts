import {useQuery} from '@tanstack/react-query';
import {ResponseGetPokemonListSchema} from 'schema/PokemonSchema';
import {axiosInstance} from 'services/axios.base';

export function useGetPokemonType() {
  return useQuery({
    queryKey: ['pokemonTypes'],
    queryFn: async () => {
      const response = await axiosInstance.get('/type');
      return ResponseGetPokemonListSchema.parse(response.data);
    },
  });
}
