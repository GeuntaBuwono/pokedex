import {
  createDrawerNavigator,
  DrawerNavigationProp,
  DrawerToggleButton,
} from '@react-navigation/drawer';
import {themeAtom} from 'atoms/appAtom';
import {useAtom} from 'jotai';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

import {AppStackNavigator} from './AppStackNavigator';

const StyledImageLeftHeader = styled(Image)`
  height: 24px;
  width: 69px;
`;

const LeftHeader = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress} testID="leftHeader">
      <StyledImageLeftHeader
        resizeMode="contain"
        source={require('../images/logo.png')}
      />
    </TouchableOpacity>
  );
};

const Drawer = createDrawerNavigator();

export type RootDrawerParamList = {
  Homepage: undefined;
  DetailPokemon: {pokemonId: string};
  TypePokemon: {pokemonType: string};
};

export type AppDrawerNavigationProps = DrawerNavigationProp<
  RootDrawerParamList,
  'Homepage'
>;

export default function AppDrawerNavigator() {
  const [isDarkMode, setIsDarkMode] = useAtom(themeAtom);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: '',
        drawerPosition: 'right',
        swipeEnabled: false,
        headerLeftContainerStyle: {
          padding: 12,
        },
        headerRightContainerStyle: {
          padding: 12,
        },
        headerLeft: () => (
          <LeftHeader
            onPress={() => {
              setIsDarkMode(!isDarkMode);
            }}
          />
        ),
        headerRight: DrawerToggleButton,
      }}>
      <Drawer.Screen name="Home" component={AppStackNavigator} />
    </Drawer.Navigator>
  );
}
