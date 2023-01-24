import {Image, TouchableOpacity, View} from 'react-native';
import {PokemonResults} from 'schema/PokemonSchema';
import styled from 'styled-components';

import Badge from './Badge';
import Label from './Label';

const StyledCardItem = styled(TouchableOpacity)`
  background-color: ${props => props.theme.card?.background.color};
  padding: 25px;
  border-radius: 24px;
  gap: 10px;
`;

const StyledCardItemImage = styled(Image)`
  width: 100%;
  height: 200px;
  background-color: ${props => props.theme.card?.image.background.color};
`;

const StyledBadgeWrapper = styled(View)`
  flex-direction: row;
  gap: 8px;
`;

const POKEMON_TYPE_LIST = [
  {
    color: 'orange',
  },
  {
    color: 'red',
  },
  {
    color: 'green',
  },
];

function CardItem({
  item,
  index,
  onPress,
}: {
  item: PokemonResults;
  index: number;
  onPress: () => void;
}) {
  return (
    <StyledCardItem onPress={onPress}>
      <View>
        <StyledCardItemImage
          resizeMode="contain"
          source={{
            uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          }}
        />
      </View>
      <Label $size="sm" $color="#B3B6B8" $isBold>
        #{String(index + 1)}
      </Label>
      <Label $textTransform="capitalize" $isBold>
        {item.name}
      </Label>
      <StyledBadgeWrapper>
        {POKEMON_TYPE_LIST.map((pokemon, indexPokemon) => (
          <Badge
            key={pokemon.color}
            label={`Type ${indexPokemon + 1}`}
            $bgColor={pokemon.color}
            $size="sm"
          />
        ))}
      </StyledBadgeWrapper>
    </StyledCardItem>
  );
}

export default CardItem;
