import {z} from 'zod';

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

export type ResponseGetPokemonList = z.infer<
  typeof ResponseGetPokemonListSchema
>;
