import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, TouchableOpacity, View} from 'react-native';
import {PokemonResults} from 'schema/PokemonSchema';
import {RootStackParamList} from 'screens/AppStackNavigator';

import Badge from './Badge';
import Label from './Label';

function CardItem({
  item,
  index,
  navigation,
}: {
  item: PokemonResults;
  index: number;
  navigation?: NativeStackNavigationProp<RootStackParamList, 'Homepage'>;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation?.navigate('DetailPokemon', {
          pokemonId: item.name,
        });
      }}
      style={{
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 24,
        gap: 10,
      }}>
      <View>
        <Image
          style={{
            width: '100%',
            height: 200,
            backgroundColor: 'lightgray',
          }}
          resizeMode="contain"
          source={{
            uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          }}
        />
      </View>
      <Label $size="sm" $color="#B3B6B8" $isBold>
        #{String(index)}
      </Label>
      <Label $textTransform="capitalize" $isBold>
        {item.name}
      </Label>
      <View style={{flexDirection: 'row', gap: 8}}>
        <Badge label="Type 1" $bgColor="orange" />
        <Badge label="Type 2" $bgColor="red" />
        <Badge label="Type 3" $bgColor="green" />
      </View>
    </TouchableOpacity>
  );
}

export default CardItem;
