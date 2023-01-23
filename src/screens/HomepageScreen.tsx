import {NavigationProp, useNavigation} from '@react-navigation/native';
import {themeAtom} from 'atoms/appAtom';
import Button from 'components/Button';
import Label from 'components/Label';
import {useAtom} from 'jotai';
import ScrollViewLayout from 'layouts/ScrollViewLayout';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {RootStackParamList} from './AppStackNavigator';

function HomepageScreen() {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  const {t} = useTranslation(['homepage']);
  const [isDarkMode, setIsDarkMode] = useAtom(themeAtom);

  return (
    <ScrollViewLayout>
      <View style={{alignItems: 'flex-end'}}>
        <Image
          style={{
            height: 300,
            width: 250,
          }}
          source={require('../images/homepage-banner.png')}
        />
      </View>
      <View style={{gap: 16}}>
        <Label $size="lg" $isBold>
          {t('homepage:welcome')}
        </Label>
        <Label>{t('homepage:description')}</Label>
      </View>

      <View style={{marginTop: 32, flexDirection: 'row'}}>
        <Button onPress={() => undefined}>
          {t('homepage:button.Check PokèDex')}
        </Button>
      </View>

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
    </ScrollViewLayout>
  );
}

export default HomepageScreen;
