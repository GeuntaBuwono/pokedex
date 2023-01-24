import {
  createDrawerNavigator,
  DrawerNavigationProp,
  DrawerToggleButton,
} from '@react-navigation/drawer';
import {themeAtom} from 'atoms/appAtom';
import {useGetPokemonType} from 'hooks/useGetPokemonType';
import {useAtom} from 'jotai';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import TypePokemonScreen from 'screens/TypePokemonScreen';
import styled from 'styled-components';

import {AppStackNavigator} from './AppStackNavigator';

const StyledImageLeftHeader = styled(Image)`
  height: 24px;
  width: 69px;
`;

const LeftHeader = () => {
  const [isDarkMode, setIsDarkMode] = useAtom(themeAtom);

  return (
    <TouchableOpacity
      onPress={() => {
        setIsDarkMode(!isDarkMode);
      }}
      testID="leftHeader">
      <StyledImageLeftHeader
        resizeMode="contain"
        source={require('../images/logo.png')}
      />
    </TouchableOpacity>
  );
};

const Drawer = createDrawerNavigator();

export type RootDrawerParamList = {
  Home: undefined;
  TypePokemon: {pokemonType: string};
};

export type AppDrawerNavigationProps = DrawerNavigationProp<
  RootDrawerParamList,
  'Home'
>;

export default function AppDrawerNavigator() {
  const {data} = useGetPokemonType();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: '',
        drawerPosition: 'right',
        swipeEnabled: false,
        drawerActiveTintColor: '#056593',
        drawerActiveBackgroundColor: '#fff',
        headerLeftContainerStyle: {
          padding: 12,
        },
        headerRightContainerStyle: {
          padding: 12,
        },
        drawerLabelStyle: {
          textTransform: 'capitalize',
          fontFamily: 'Poppins-Regular',
        },
        headerLeft: LeftHeader,
        headerRight: DrawerToggleButton,
      }}>
      <Drawer.Screen name="Home" component={AppStackNavigator} />
      {data?.results.map(item => {
        if (item.name !== 'unknown') {
          return (
            <Drawer.Screen
              key={item.name}
              name={item.name}
              component={TypePokemonScreen}
              initialParams={{
                pokemonType: item.name,
              }}
            />
          );
        }
      })}
    </Drawer.Navigator>
  );
}
