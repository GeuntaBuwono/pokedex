/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';
import Badge from 'components/Badge';
import Label from 'components/Label';
import {useGetPokemonListByType} from 'hooks/useGetPokemonListByType';
import ScrollViewLayout from 'layouts/ScrollViewLayout';
import {RootStackParamList} from 'navigators/AppStackNavigator';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import {PokemonResults, PokemonType} from 'schema/PokemonSchema';
import {useTheme} from 'styled-components/native';
import colorTypeSwitcher from 'utils/colorTypeSwitcher';

import {StyledDescriptionItemWrapper} from './DetailPokemonScreen';

const CardItemType = ({
  item,
  index,
  onPress,
  type,
}: {
  item: PokemonResults;
  type: PokemonType;
  index: number;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
      }}>
      <View
        style={{
          borderRightWidth: 1,
          borderRightColor: '#ECEDED',
          justifyContent: 'center',
          padding: 10,
          marginVertical: 12,
        }}>
        <Image
          style={{
            width: 75,
            height: 75,
          }}
          resizeMode="contain"
          source={{
            uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          }}
        />
      </View>
      <View style={{padding: 20, gap: 12}}>
        <Label $isBold>#{String(index + 1)}</Label>
        <Label $isBold $textTransform="capitalize">
          {item.name}
        </Label>
        <StyledDescriptionItemWrapper>
          <Badge
            $size="sm"
            label={type}
            $bgColor={colorTypeSwitcher({
              type: type,
            })}
          />
        </StyledDescriptionItemWrapper>
      </View>
    </TouchableOpacity>
  );
};

type NavigationPokemonTypeScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Homepage'
>;

type DetailPokemonRouteProp = RouteProp<RootStackParamList, 'TypePokemon'>;

const ItemSeparatorComponent = () => {
  return <View style={{borderTopColor: '#ECEDED', borderTopWidth: 1}} />;
};

function TypePokemonScreen() {
  const route = useRoute<DetailPokemonRouteProp>();
  const navigation = useNavigation<NavigationPokemonTypeScreenProps>();

  const {t} = useTranslation(['pokemonType']);
  const {screen, card} = useTheme();

  const {data} = useGetPokemonListByType({
    type: route.params.pokemonType,
    limit: 5,
    offset: 5,
  });

  return (
    <ScrollViewLayout isNoPadding>
      <View
        style={{
          padding: 24,
          backgroundColor: screen.pokemonType.color,
          elevation: 20,
        }}>
        <Label $isBold $size="lg">
          {t('pokemonType:Pokemon_with_Type')}
        </Label>
        <Label $isBold $size="lg" $textTransform="capitalize">
          {route.params.pokemonType}
        </Label>

        <View
          style={{
            marginTop: 24,
            height: Dimensions.get('screen').height - 250,
            backgroundColor: card.background.color,
            borderRadius: 24,
            padding: 12,
          }}>
          <FlashList
            nestedScrollEnabled
            /* istanbul ignore next */
            keyExtractor={item => item.pokemon.name}
            ItemSeparatorComponent={ItemSeparatorComponent}
            data={data?.pokemon}
            renderItem={({item, index}) => (
              <CardItemType
                onPress={() => {
                  navigation.navigate('DetailPokemon', {
                    pokemonId: item.pokemon.name,
                  });
                }}
                type={route.params.pokemonType}
                item={item.pokemon}
                index={index}
              />
            )}
            estimatedItemSize={100}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* TODO add pagination */}
          {/* <View>
            <Label $isBold>{t('pokemonType:Per_Page')}</Label>
          </View> */}
          <View>
            <Label $isBold>
              {t('pokemonType:Total_Data')} {String(data?.pokemon.length ?? 0)}
            </Label>
          </View>
        </View>
      </View>
    </ScrollViewLayout>
  );
}

export default TypePokemonScreen;
