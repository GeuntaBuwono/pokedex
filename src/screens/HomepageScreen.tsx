/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';
import Button from 'components/Button';
import CardItem from 'components/Card';
import Label from 'components/Label';
import ListFooter from 'components/ListFooter';
import {useGetPokemonList} from 'hooks/useGetPokemonList';
import ScrollViewLayout from 'layouts/ScrollViewLayout';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, View} from 'react-native';
import {useTheme} from 'styled-components/native';

import {RootStackParamList} from './AppStackNavigator';

type NavigationLoginScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Homepage'
>;

function HomepageScreen() {
  const [offset] = useState(5);
  const [isUserCheckedPokedex, setIsUserCheckedPokedex] = useState(false);

  const {list} = useTheme();

  const navigation = useNavigation<NavigationLoginScreenProps>();

  const {data} = useGetPokemonList({
    limit: 5,
    offset,
  });

  const {t} = useTranslation(['homepage']);

  // TODO add loadmore
  const handleLoadMore = () => undefined;

  if (isUserCheckedPokedex) {
    return (
      <View
        style={{
          height: Dimensions.get('screen').height - 50,
          backgroundColor: list.background.color,
        }}>
        <FlashList
          nestedScrollEnabled
          data={data?.results}
          estimatedItemSize={200}
          contentContainerStyle={{
            padding: 45,
          }}
          ItemSeparatorComponent={
            /* istanbul ignore next */
            () => <View style={{marginVertical: 25}} />
          }
          renderItem={({item, index}) => (
            /* istanbul ignore next */
            <CardItem item={item} index={index} navigation={navigation} />
          )}
          // TODO add loadmore
          ListFooterComponent={() => <ListFooter onPress={handleLoadMore} />}
          ListFooterComponentStyle={{
            marginVertical: 50,
          }}
        />
      </View>
    );
  }

  return (
    <ScrollViewLayout isNoPadding>
      <View
        style={{
          paddingHorizontal: 36,
          paddingVertical: 40,
          height: Dimensions.get('screen').height - 100,
        }}>
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
          <Button
            onPress={() => {
              setIsUserCheckedPokedex(!isUserCheckedPokedex);
            }}>
            {t('homepage:button.Check PokèDex')}
          </Button>
        </View>
      </View>
    </ScrollViewLayout>
  );
}

export default HomepageScreen;
