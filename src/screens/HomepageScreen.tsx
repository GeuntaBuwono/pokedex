import {NavigationProp, useNavigation} from '@react-navigation/native';
import {themeAtom} from 'atoms/appAtom';
import {useAtom} from 'jotai';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';

import {RootStackParamList} from './AppStackNavigator';

function HomepageScreen() {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  const {t} = useTranslation(['homepage']);
  const [isDarkMode, setIsDarkMode] = useAtom(themeAtom);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text>{t('homepage:Homepage')}</Text>
      <Text>{isDarkMode ? 'Dark' : 'Light'} Theme</Text>

      <View style={{gap: 10, marginTop: 12}}>
        <TouchableOpacity
          onPress={() => {
            setIsDarkMode(!isDarkMode);
          }}
          style={{backgroundColor: 'gray', padding: 8, borderRadius: 8}}>
          <Text style={{color: '#fff'}}>
            {t('homepage:button.Change Theme')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('TypePokemon', {
              pokemonType: 'normal',
            });
          }}
          style={{backgroundColor: 'gray', padding: 8, borderRadius: 8}}>
          <Text style={{color: '#fff'}}>
            {t('homepage:button.Go To Type Pokemon')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('DetailPokemon', {
              pokemonId: 'pikachu',
            });
          }}
          style={{backgroundColor: 'gray', padding: 8, borderRadius: 8}}>
          <Text style={{color: '#fff'}}>
            {t('homepage:button.Go To Detail Pikachu')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomepageScreen;
