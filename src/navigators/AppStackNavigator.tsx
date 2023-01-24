import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailPokemonScreen from 'screens/DetailPokemonScreen';
import HomepageScreen from 'screens/HomepageScreen';
import TypePokemonScreen from 'screens/TypePokemonScreen';

export type RootStackParamList = {
  Homepage: undefined;
  DetailPokemon: {pokemonId: string};
  TypePokemon: {pokemonType: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Homepage"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Homepage" component={HomepageScreen} />
      <Stack.Screen name="TypePokemon" component={TypePokemonScreen} />
      <Stack.Screen name="DetailPokemon" component={DetailPokemonScreen} />
    </Stack.Navigator>
  );
};
