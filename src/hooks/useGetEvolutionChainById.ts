import {useQuery} from '@tanstack/react-query';
import {axiosInstance} from 'services/axios.base';
import {z} from 'zod';

const ParamsGetPokemonEvolutionChainSchema = z.object({
  id: z.string(),
});

const TransformedResponseEvolution = z.array(
  z.object({
    species_name: z.string(),
    min_level: z.number(),
    trigger_name: z.null(),
    item: z.null(),
  }),
);

type EvoDataType = {
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

export function useGetEvolutionChainById<
  T extends z.infer<typeof ParamsGetPokemonEvolutionChainSchema>,
>(id: T) {
  return useQuery({
    queryKey: ['evolutionChain', id],
    queryFn: async ({queryKey: [, variables]}) => {
      const {id: keyId} = variables as {id: string};
      const response = await axiosInstance.get(`/evolution-chain/${keyId}`);
      const evoChain = [];
      let evoData: EvoDataType = response.data.chain;

      do {
        const [evoDetail] = evoData.evolution_details;

        evoChain.push({
          species_name: evoData.species.name,
          min_level: !evoDetail ? 1 : evoDetail.min_level,
          trigger_name: !evoDetail ? null : evoDetail.trigger.name,
          item: !evoDetail ? null : evoDetail.item,
        });

        [evoData] = evoData.evolves_to;
      } while (
        !!evoData &&
        Object.prototype.hasOwnProperty.call(evoData, 'evolves_to')
      );

      return TransformedResponseEvolution.parse(evoChain);
    },
  });
}
