import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, Text, TouchableOpacity} from 'react-native';

import DetailPokemonScreen from './DetailPokemonScreen';
import HomepageScreen from './HomepageScreen';
import TypePokemonScreen from './TypePokemonScreen';

export type RootStackParamList = {
  Homepage: undefined;
  DetailPokemon: {pokemonId: string};
  TypePokemon: {pokemonType: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const LeftHeader = () => {
  return (
    <Image
      style={{
        height: 24,
        width: 69,
      }}
      resizeMode="contain"
      source={require('../images/logo.png')}
    />
  );
};

const RightHeader = () => {
  return (
    <TouchableOpacity>
      <Text>Home</Text>
    </TouchableOpacity>
  );
};

export const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Homepage"
      screenOptions={{
        headerLeft: LeftHeader,
        headerRight: RightHeader,
        title: '',
      }}>
      <Stack.Screen name="Homepage" component={HomepageScreen} />
      <Stack.Screen name="TypePokemon" component={TypePokemonScreen} />
      <Stack.Screen name="DetailPokemon" component={DetailPokemonScreen} />
    </Stack.Navigator>
  );
};
