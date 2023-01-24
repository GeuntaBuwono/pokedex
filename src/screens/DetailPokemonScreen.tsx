import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useQueries, useQuery} from '@tanstack/react-query';
import Badge from 'components/Badge';
import StyledImage from 'components/Image';
import Label from 'components/Label';
import LoadingSpinner from 'components/Loading';
import ScreenViewLayout from 'layouts/ScreenViewLayout';
import ScrollViewLayout from 'layouts/ScrollViewLayout';
import {RootStackParamList} from 'navigators/AppStackNavigator';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  EvoDataType,
  PokemonSpecies,
  ResponseGetPokemonDetailSchema,
  TransformedResponseEvolution,
} from 'schema/PokemonSchema';
import {axiosInstance} from 'services/axios.base';
import styled from 'styled-components/native';

export const StyledSection = styled.View`
  row-gap: 18px;
  padding: 16px 0px;
`;

const StyledStatsWrapper = styled.View`
  gap: 12px;
  padding: 12px 0px;
  justify-content: space-around;
  flex-direction: row;
`;

const StyledCircle = styled.View`
  height: 100px;
  width: 100px;
  padding: 8px;
  border-radius: 100px;
  border-width: 5px;
  border-color: ${
    /* istanbul ignore next */
    props => props.theme.colors.green[700]
  };
  justify-content: center;
`;

/* istanbul ignore next */
const EvolutionItem = ({imageUri, name}: {imageUri?: string; name: string}) => (
  <>
    <View>
      <StyledCircle>
        <ScreenViewLayout>
          {imageUri && (
            <StyledImage
              source={{
                uri: imageUri,
              }}
            />
          )}
        </ScreenViewLayout>
      </StyledCircle>
      <View style={{marginTop: 12}}>
        <Label
          $textTransform="uppercase"
          $size="xm"
          $textAlign="center"
          $isBold>
          {name}
        </Label>
      </View>
    </View>
  </>
);

export const StyledDescriptionItemWrapper = styled(View)<{gap?: number}>`
  flex-direction: row;
  gap: ${props => `${props.gap || 20}px`};
`;

type DetailPokemonRouteProp = RouteProp<RootStackParamList, 'DetailPokemon'>;
type NavigationHomepageScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'DetailPokemon'
>;

function DetailPokemonScreen() {
  const route = useRoute<DetailPokemonRouteProp>();
  const [speciesId, setSpeciesId] = useState<string>();
  const {t} = useTranslation(['detailPokemon']);
  const navigation = useNavigation<NavigationHomepageScreenProps>();

  useQuery<{id: string}, unknown, PokemonSpecies>(
    ['pokemonSpecies', route.params.pokemonId],
    async () => {
      const response = await axiosInstance.get(
        `/pokemon-species/${route.params.pokemonId}`,
      );
      return response.data;
    },
    {
      enabled: !!route.params.pokemonId,
      onSuccess: species => {
        setSpeciesId(species.evolution_chain.url.split('/')[6]);
      },
    },
  );

  const {data: dataPokemonEvolution} = useQuery(
    ['evolutionChain', speciesId],
    async ({queryKey: [, id]}) => {
      const response = await axiosInstance.get(`/evolution-chain/${id}`);
      const evoChain = [];
      let evoData: EvoDataType = response.data.chain;

      do {
        evoChain.push({
          species_name: evoData.species.name,
        });

        [evoData] = evoData.evolves_to;
      } while (
        !!evoData &&
        Object.prototype.hasOwnProperty.call(evoData, 'evolves_to')
      );

      return TransformedResponseEvolution.parse(evoChain);
    },
    {enabled: !!speciesId},
  );

  const [
    {data, isError, isLoading},
    {data: firstEvo},
    {data: secondEvo},
    {data: thirdEvo},
  ] = useQueries({
    queries: [
      {
        queryKey: ['pokemonDetail', route.params.pokemonId],
        queryFn: async () => {
          const response = await axiosInstance.get(
            `/pokemon/${route.params.pokemonId}`,
          );
          return ResponseGetPokemonDetailSchema.parse(response.data);
        },
        enabled: !!route.params.pokemonId,
      },
      {
        queryKey: [
          'pokemonDetailEvolutions',
          dataPokemonEvolution && dataPokemonEvolution[0].species_name,
        ],
        queryFn: async () => {
          const response = await axiosInstance.get(
            `/pokemon/${
              dataPokemonEvolution && dataPokemonEvolution[0].species_name
            }`,
          );
          return ResponseGetPokemonDetailSchema.parse(response.data);
        },
        enabled: !!(
          dataPokemonEvolution && dataPokemonEvolution[0].species_name
        ),
      },
      {
        queryKey: [
          'pokemonDetailEvolutions',
          dataPokemonEvolution && dataPokemonEvolution[1].species_name,
        ],
        queryFn: async () => {
          const response = await axiosInstance.get(
            `/pokemon/${
              dataPokemonEvolution && dataPokemonEvolution[1].species_name
            }`,
          );
          return ResponseGetPokemonDetailSchema.parse(response.data);
        },
        enabled: !!(
          dataPokemonEvolution && dataPokemonEvolution[1].species_name
        ),
      },
      {
        queryKey: [
          'pokemonDetailEvolutions',
          dataPokemonEvolution && dataPokemonEvolution[2].species_name,
        ],
        queryFn: async () => {
          const response = await axiosInstance.get(
            `/pokemon/${
              dataPokemonEvolution && dataPokemonEvolution[2].species_name
            }`,
          );
          return ResponseGetPokemonDetailSchema.parse(response.data);
        },
        enabled: !!(
          dataPokemonEvolution && dataPokemonEvolution[2].species_name
        ),
      },
    ],
  });

  const evolutionImageMapper: Record<string, string | undefined> = {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    0: firstEvo?.sprites.other['official-artwork'].front_default,
    1: secondEvo?.sprites.other['official-artwork'].front_default,
    2: thirdEvo?.sprites.other['official-artwork'].front_default,
  };

  if (!isLoading || !isError || data) {
    return (
      <ScrollViewLayout>
        <StyledSection>
          {data?.name && (
            <Label $size="xl" $textTransform="capitalize" $isBold>
              {data?.name}
            </Label>
          )}
        </StyledSection>
        <StyledSection>
          {data?.sprites.other['official-artwork'].front_default && (
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                backgroundColor: '#B3B6B8',
                width: '100%',
                height: 300,
              }}
              resizeMode="contain"
              source={{
                uri: data?.sprites.other['official-artwork'].front_default,
              }}
            />
          )}
        </StyledSection>
        <StyledSection>
          <StyledDescriptionItemWrapper>
            <Label $isBold>{t('detailPokemon:Weight')}</Label>
            {data?.weight && <Label>{data?.weight}</Label>}
          </StyledDescriptionItemWrapper>
          <StyledDescriptionItemWrapper>
            <Label $isBold>{t('detailPokemon:Height')}</Label>
            {data?.height && <Label>{data?.height}</Label>}
          </StyledDescriptionItemWrapper>
          <StyledDescriptionItemWrapper>
            <Label $isBold>{t('detailPokemon:Abilities')}</Label>
            <View>
              {data?.abilities.map(abilitiy => (
                <Label key={abilitiy.ability.name}>
                  {'\u00B7' + ' '} {abilitiy.ability.name}
                  {abilitiy.is_hidden ? ' (hidden)' : ''}
                </Label>
              ))}
            </View>
          </StyledDescriptionItemWrapper>

          <StyledDescriptionItemWrapper>
            <Label $isBold>{t('detailPokemon:Type')}</Label>
            <StyledDescriptionItemWrapper gap={20}>
              {data?.types.map((type, index) => {
                if (index % 2 === 0 && index < 4) {
                  return (
                    <TouchableOpacity
                      key={type.type.name}
                      onPress={() => {
                        navigation.navigate('TypePokemon', {
                          pokemonType: type.type.name,
                        });
                      }}>
                      <Badge label={type.type.name} $bgColor="red" />
                    </TouchableOpacity>
                  );
                }
              })}
            </StyledDescriptionItemWrapper>
            <StyledDescriptionItemWrapper gap={20}>
              {data?.types.map((type, index) => {
                if (index % 2 !== 0 && index < 4) {
                  return (
                    <TouchableOpacity
                      key={type.type.name}
                      onPress={() => {
                        navigation.navigate('TypePokemon', {
                          pokemonType: type.type.name,
                        });
                      }}>
                      <Badge label={type.type.name} $bgColor="red" />
                    </TouchableOpacity>
                  );
                }
              })}
            </StyledDescriptionItemWrapper>
          </StyledDescriptionItemWrapper>
        </StyledSection>

        {/* 
          // TODO add other image
          <View>
            <Label $isBold>Other Images :</Label>
          </View> 
        */}
        <StyledSection>
          <Label $isBold>{t('detailPokemon:Stats')}</Label>
          <StyledStatsWrapper>
            {data?.stats.map((stat, index) => {
              if (index % 2 === 0) {
                return (
                  <StyledCircle key={stat.stat.name}>
                    <Label $textAlign="center" $size="md" $isBold>
                      {stat.base_stat}
                    </Label>
                    <Label
                      $textAlign="center"
                      $textTransform="uppercase"
                      $size="xm">
                      {stat.stat.name}
                    </Label>
                  </StyledCircle>
                );
              }
            })}
          </StyledStatsWrapper>
          <StyledStatsWrapper>
            {data?.stats.map((stat, index) => {
              if (index % 2 !== 0) {
                return (
                  <StyledCircle key={stat.stat.name}>
                    <Label $textAlign="center" $size="md" $isBold>
                      {stat.base_stat}
                    </Label>
                    <Label
                      $textAlign="center"
                      $textTransform="uppercase"
                      $size="xm">
                      {stat.stat.name}
                    </Label>
                  </StyledCircle>
                );
              }
            })}
          </StyledStatsWrapper>
        </StyledSection>
        <StyledSection>
          <Label $isBold>{t('detailPokemon:Evolutions')}</Label>
          <StyledStatsWrapper>
            {dataPokemonEvolution?.map((item, index) => (
              <TouchableOpacity
                key={item.species_name}
                onPress={() => {
                  navigation.navigate('DetailPokemon', {
                    pokemonId: item.species_name,
                  });
                }}>
                <EvolutionItem
                  name={item.species_name}
                  imageUri={evolutionImageMapper[index]}
                />
              </TouchableOpacity>
            ))}
          </StyledStatsWrapper>
        </StyledSection>
      </ScrollViewLayout>
    );
  }

  return <LoadingSpinner />;
}

export default DetailPokemonScreen;
