import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';

import {RootStackParamList} from './AppStackNavigator';

function TypePokemonScreen() {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Type Pokemon</Text>
      <TouchableOpacity
        onPress={() => {
          navigate('DetailPokemon', {
            pokemonId: 'pikachu',
          });
        }}
        style={{backgroundColor: 'gray', padding: 8, borderRadius: 8}}>
        <Text style={{color: '#fff'}}>Go To Detail Pikachu</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TypePokemonScreen;
