import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';
import Badge from 'components/Badge';
import Label from 'components/Label';
import {useGetPokemonListByType} from 'hooks/useGetPokemonListByType';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import {PokemonResults} from 'schema/PokemonSchema';
import {useTheme} from 'styled-components/native';

import {RootStackParamList} from './AppStackNavigator';
import {StyledDescriptionItemWrapper} from './DetailPokemonScreen';

const CardItemType = ({
  item,
  index,
  onPress,
}: {
  item: PokemonResults;
  index: number;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flexDirection: 'row',
      marginBottom: 12,
    }}>
    <View
      style={{
        borderRightWidth: 1,
        borderRightColor: 'red',
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
      <Label $isBold># {String(index + 1)}</Label>
      <Label $isBold $textTransform="capitalize">
        {item.name}
      </Label>
      <StyledDescriptionItemWrapper>
        <Badge $size="sm" label="Type 1" $bgColor="red" />
        <Badge $size="sm" label="Type 2" $bgColor="blue" />
      </StyledDescriptionItemWrapper>
    </View>
  </TouchableOpacity>
);

type NavigationPokemonTypeScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Homepage'
>;

type DetailPokemonRouteProp = RouteProp<RootStackParamList, 'TypePokemon'>;

function TypePokemonScreen() {
  const route = useRoute<DetailPokemonRouteProp>();
  const navigation = useNavigation<NavigationPokemonTypeScreenProps>();

  const {screen} = useTheme();

  const {data} = useGetPokemonListByType({
    type: route.params.pokemonType,
    limit: 5,
    offset: 5,
  });

  const {t} = useTranslation(['pokemonType']);

  return (
    <View style={{padding: 24, backgroundColor: screen.background.color}}>
      <Label $isBold $size="lg" $textTransform="capitalize">
        {t('pokemonType:Pokemon_with_Type')} {route.params.pokemonType}
      </Label>

      <View
        style={{
          marginTop: 24,
          height: Dimensions.get('screen').height - 200,
          backgroundColor: 'rgba(52, 52, 52, 0.2)',
          borderRadius: 24,
        }}>
        <FlashList
          nestedScrollEnabled
          /* istanbul ignore next */
          keyExtractor={item => item.pokemon.name}
          data={data?.pokemon}
          renderItem={({item, index}) => (
            <CardItemType
              onPress={() => {
                navigation.navigate('DetailPokemon', {
                  pokemonId: item.pokemon.name,
                });
              }}
              item={item.pokemon}
              index={index}
            />
          )}
          estimatedItemSize={200}
          ListFooterComponent={() => {
            return (
              <View>
                <View>
                  <Label>Per Page :</Label>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

export default TypePokemonScreen;
