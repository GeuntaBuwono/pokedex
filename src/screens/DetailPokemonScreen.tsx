import {RouteProp, useRoute} from '@react-navigation/native';
import Badge from 'components/Badge';
import StyledImage from 'components/Image';
import Label from 'components/Label';
import LoadingSpinner from 'components/Loading';
import {useGetPokemonDetail} from 'hooks/useGetDetailPokemon';
import ScreenViewLayout from 'layouts/ScreenViewLayout';
import ScrollViewLayout from 'layouts/ScrollViewLayout';
import {useTranslation} from 'react-i18next';
import {Image, View} from 'react-native';
import styled from 'styled-components/native';

import {RootStackParamList} from './AppStackNavigator';

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
    <Label $textTransform="uppercase" $size="xm">
      {name}
    </Label>
  </View>
);

export const StyledDescriptionItemWrapper = styled(View)<{gap?: number}>`
  flex-direction: row;
  gap: ${props => `${props.gap || 20}px`};
`;

type DetailPokemonRouteProp = RouteProp<RootStackParamList, 'DetailPokemon'>;

function DetailPokemonScreen() {
  const route = useRoute<DetailPokemonRouteProp>();
  const {t} = useTranslation(['detailPokemon']);

  const {data, isLoading, isError} = useGetPokemonDetail({
    id: route.params.pokemonId,
  });

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
                    <Badge
                      key={type.type.name}
                      label={type.type.name}
                      $bgColor="red"
                    />
                  );
                }
              })}
            </StyledDescriptionItemWrapper>
            <StyledDescriptionItemWrapper gap={20}>
              {data?.types.map((type, index) => {
                if (index % 2 !== 0 && index < 4) {
                  return (
                    <Badge
                      key={type.type.name}
                      label={type.type.name}
                      $bgColor="red"
                    />
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
            {data?.sprites.versions['generation-i'].yellow.front_default && (
              <EvolutionItem
                name="Generation I"
                imageUri={
                  data?.sprites.versions['generation-i'].yellow.front_default
                }
              />
            )}
            {data?.sprites.versions['generation-ii'].gold.front_default && (
              <EvolutionItem
                name="Generation II"
                imageUri={
                  data?.sprites.versions['generation-ii'].gold.front_default
                }
              />
            )}
          </StyledStatsWrapper>
          <StyledStatsWrapper>
            {data?.sprites.versions['generation-iii'].emerald.front_default && (
              <EvolutionItem
                name="Generation III"
                imageUri={
                  data?.sprites.versions['generation-iii'].emerald.front_default
                }
              />
            )}
            {data?.sprites.versions['generation-iv']['diamond-pearl']
              .front_default && (
              <EvolutionItem
                name="Generation IV"
                imageUri={
                  data?.sprites.versions['generation-iv']['diamond-pearl']
                    .front_default
                }
              />
            )}
          </StyledStatsWrapper>
        </StyledSection>
      </ScrollViewLayout>
    );
  }

  return <LoadingSpinner />;
}

export default DetailPokemonScreen;
