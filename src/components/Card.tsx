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
        <Badge label="Type 1" $bgColor="orange" />
        <Badge label="Type 2" $bgColor="red" />
        <Badge label="Type 3" $bgColor="green" />
      </StyledBadgeWrapper>
    </StyledCardItem>
  );
}

export default CardItem;
