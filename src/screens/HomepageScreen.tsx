/* eslint-disable react-native/no-inline-styles */
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';
import Badge from 'components/Badge';
import Button from 'components/Button';
import CardItem from 'components/Card';
import Label from 'components/Label';
import ListFooter from 'components/ListFooter';
import LoadingSpinner from 'components/Loading';
import {useGetPokemonDetail} from 'hooks/useGetDetailPokemon';
import {useGetPokemonList} from 'hooks/useGetPokemonList';
import i18next from 'i18next';
import ScreenViewLayout from 'layouts/ScreenViewLayout';
import ScrollViewLayout from 'layouts/ScrollViewLayout';
import {useCallback, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, Platform, ScrollView, View} from 'react-native';
import {PokemonResults} from 'schema/PokemonSchema';
import {useTheme} from 'styled-components/native';

import {RootStackParamList} from './AppStackNavigator';
import {
  StyledDescriptionItemWrapper,
  StyledSection,
} from './DetailPokemonScreen';

const ListHeaderComponent = ({dataCount}: {dataCount: number}) => (
  <View
    style={{
      justifyContent: 'center',
      marginVertical: 24,
      paddingHorizontal: 24,
    }}>
    <Label $textAlign="center" $isBold $size="lg">
      {i18next.t('homepage:list.PokèDex')}
    </Label>
    {!!dataCount && (
      <Label $textAlign="center">
        {i18next.t('homepage:list.All Generation totaling')} {String(dataCount)}
        {i18next.t('homepage:list.Pokemon')}
      </Label>
    )}
  </View>
);

type NavigationLoginScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Homepage'
>;

function HomepageScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '60%', '90%'], []);
  const {t} = useTranslation(['homepage']);
  const {list, screen} = useTheme();

  const navigation = useNavigation<NavigationLoginScreenProps>();
  const [selectedCard, setSelectedCard] = useState<PokemonResults>();
  const [offset] = useState(5);
  const [isUserCheckedPokedex, setIsUserCheckedPokedex] = useState(false);

  const {data, isLoading} = useGetPokemonList({
    limit: 5,
    offset,
  });

  const {data: dataForBottomDetail, isLoading: isLoadingDetailPokemon} =
    useGetPokemonDetail({
      id: selectedCard?.name || '1',
    });

  // TODO add loadmore
  const handleLoadMore = () => undefined;

  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  const isAndroid = Platform.OS === 'android';

  if (isUserCheckedPokedex) {
    return (
      <View
        style={{
          height: Dimensions.get('screen').height - 50,
          backgroundColor: list.background.color,
        }}>
        {!isLoading && data ? (
          <FlashList
            keyExtractor={item => item.name}
            ListHeaderComponent={() => (
              <ListHeaderComponent dataCount={data.count} />
            )}
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
              <CardItem
                item={item}
                index={index}
                onPress={() => {
                  if (isAndroid) {
                    navigation.navigate('DetailPokemon', {
                      pokemonId: item.name,
                    });
                  } else {
                    handleSnapPress(2);
                    setSelectedCard(item);
                  }
                }}
              />
            )}
            // TODO add loadmore
            ListFooterComponent={() => <ListFooter onPress={handleLoadMore} />}
            ListFooterComponentStyle={{
              marginVertical: 50,
            }}
          />
        ) : (
          <LoadingSpinner />
        )}
        <BottomSheet
          enablePanDownToClose
          ref={bottomSheetRef}
          index={-1}
          backdropComponent={renderBackdrop}
          backgroundStyle={{
            backgroundColor: screen.background.color,
          }}
          handleStyle={{
            backgroundColor: screen.background.color,
            borderTopEndRadius: 50,
            borderTopStartRadius: 50,
          }}
          snapPoints={snapPoints}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 100,
              backgroundColor: screen.background.color,
            }}>
            {!isLoadingDetailPokemon && dataForBottomDetail ? (
              <>
                <View style={{padding: 24}}>
                  {!!dataForBottomDetail?.name && (
                    <Label $size="xl" $textTransform="capitalize" $isBold>
                      {dataForBottomDetail?.name}
                    </Label>
                  )}
                </View>
                <ScreenViewLayout>
                  <StyledSection>
                    {dataForBottomDetail?.sprites.other['official-artwork']
                      .front_default && (
                      <Image
                        style={{
                          height: 300,
                          width: 250,
                        }}
                        resizeMode="contain"
                        source={{
                          uri: dataForBottomDetail?.sprites.other[
                            'official-artwork'
                          ].front_default,
                        }}
                      />
                    )}
                  </StyledSection>
                  <StyledSection>
                    <StyledDescriptionItemWrapper>
                      <Label $isBold>Weight :</Label>
                      {!!dataForBottomDetail?.weight && (
                        <Label>{dataForBottomDetail?.weight}</Label>
                      )}
                    </StyledDescriptionItemWrapper>
                    <StyledDescriptionItemWrapper>
                      <Label $isBold>Height :</Label>
                      {!!dataForBottomDetail?.height && (
                        <Label>{dataForBottomDetail?.height}</Label>
                      )}
                    </StyledDescriptionItemWrapper>
                    <StyledDescriptionItemWrapper>
                      <Label $isBold>Abilities :</Label>
                      <View>
                        {dataForBottomDetail?.abilities.map(abilitiy => (
                          <Label key={abilitiy.ability.name}>
                            {'\u00B7' + ' '} {abilitiy.ability.name}
                            {abilitiy.is_hidden ? ' (hidden)' : ''}
                          </Label>
                        ))}
                      </View>
                    </StyledDescriptionItemWrapper>

                    <StyledDescriptionItemWrapper>
                      <Label $isBold>Type :</Label>
                      <StyledDescriptionItemWrapper gap={20}>
                        {dataForBottomDetail?.types.map((type, index) => {
                          if (index % 2 === 0 && index < 4) {
                            return (
                              <Badge
                                key={type.type.name}
                                label={type.type.name}
                                $bgColor="red"
                              />
                            );
                          }
                        })}
                      </StyledDescriptionItemWrapper>
                      <StyledDescriptionItemWrapper gap={20}>
                        {dataForBottomDetail?.types.map((type, index) => {
                          if (index % 2 !== 0 && index < 4) {
                            return (
                              <Badge
                                key={type.type.name}
                                label={type.type.name}
                                $bgColor="red"
                              />
                            );
                          }
                        })}
                      </StyledDescriptionItemWrapper>
                    </StyledDescriptionItemWrapper>
                  </StyledSection>
                  <View style={{marginTop: 32, flexDirection: 'row'}}>
                    <Button
                      onPress={() => {
                        navigation.navigate('DetailPokemon', {
                          pokemonId: dataForBottomDetail.name,
                        });
                      }}>
                      {t('homepage:button.More Detail')}
                    </Button>
                  </View>
                </ScreenViewLayout>
              </>
            ) : (
              <LoadingSpinner />
            )}
          </ScrollView>
        </BottomSheet>
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
