import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {themeAtom} from 'atoms/appAtom';
import Label from 'components/Label';
import {useAtom} from 'jotai';
import {Image, TouchableOpacity} from 'react-native';

import DetailPokemonScreen from './DetailPokemonScreen';
import HomepageScreen from './HomepageScreen';
import TypePokemonScreen from './TypePokemonScreen';

export type RootStackParamList = {
  Homepage: undefined;
  DetailPokemon: {pokemonId: string};
  TypePokemon: {pokemonType: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const LeftHeader = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress} testID="leftHeader">
      <Image
        style={{
          height: 24,
          width: 69,
        }}
        resizeMode="contain"
        source={require('../images/logo.png')}
      />
    </TouchableOpacity>
  );
};

const RightHeader = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress} testID="rightHeader">
      <Label $size="xm">Home</Label>
    </TouchableOpacity>
  );
};

type NavigationLoginScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Homepage'
>;

export const AppStackNavigator = () => {
  const [isDarkMode, setIsDarkMode] = useAtom(themeAtom);
  const navigation = useNavigation<NavigationLoginScreenProps>();

  return (
    <Stack.Navigator
      initialRouteName="Homepage"
      screenOptions={{
        headerLeft: () => (
          <LeftHeader
            onPress={() => {
              setIsDarkMode(!isDarkMode);
            }}
          />
        ),
        headerRight: () => (
          <RightHeader
            onPress={() => {
              navigation.navigate('TypePokemon', {
                pokemonType: 'normal',
              });
            }}
          />
        ),
        title: '',
      }}>
      <Stack.Screen name="Homepage" component={HomepageScreen} />
      <Stack.Screen name="TypePokemon" component={TypePokemonScreen} />
      <Stack.Screen name="DetailPokemon" component={DetailPokemonScreen} />
    </Stack.Navigator>
  );
};
