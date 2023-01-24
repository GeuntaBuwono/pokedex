/* eslint-disable react-native/no-inline-styles */
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';
import {useQuery} from '@tanstack/react-query';
import Badge from 'components/Badge';
import Button from 'components/Button';
import CardItem from 'components/Card';
import Label from 'components/Label';
import ListFooter from 'components/ListFooter';
import LoadingSpinner from 'components/Loading';
import i18next from 'i18next';
import ScreenViewLayout from 'layouts/ScreenViewLayout';
import {RootStackParamList} from 'navigators/AppStackNavigator';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, ScrollView, View} from 'react-native';
import {
  scrollTo,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {
  ParamsGetPokemonList,
  PokemonResults,
  ResponseGetPokemonDetail,
  ResponseGetPokemonList,
} from 'schema/PokemonSchema';
import {axiosInstance} from 'services/axios.base';
import {useTheme} from 'styled-components/native';
import colorTypeSwitcher from 'utils/colorTypeSwitcher';
import getJsonFromUrl from 'utils/getJsonFromUrl';

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
        {i18next.t('homepage:list.All Generation totaling')}
        {String(dataCount)}
        {i18next.t('homepage:list.Pokemon')}
      </Label>
    )}
  </View>
);

type NavigationHomepageScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Homepage'
>;

function HomepageScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '60%', '90%'], []);
  const {t} = useTranslation(['homepage', 'detailPokemon']);
  const {list, screen} = useTheme();
  const [data, setData] = useState<Array<PokemonResults>>([]);

  const navigation = useNavigation<NavigationHomepageScreenProps>();
  const [selectedCard, setSelectedCard] = useState<PokemonResults>();
  const [offset, setOffset] = useState(5);

  const {data: dataPokemon} = useQuery<
    ParamsGetPokemonList,
    unknown,
    ResponseGetPokemonList
  >(
    ['pokemon', offset],
    async ({queryKey: [, offsetResponse]}) => {
      const response = await axiosInstance.get('/pokemon', {
        params: {
          limit: 5,
          offset: offsetResponse,
        },
      });
      return response.data;
    },
    {
      onSuccess: ({results, next}) => {
        if (next) {
          const newArray: Array<PokemonResults> = [...data];

          newArray.push(...results);
          setData(newArray);
        }
      },
    },
  );

  const {data: dataForBottomDetail, isLoading: isLoadingDetailPokemon} =
    useQuery<{id: string}, unknown, ResponseGetPokemonDetail>(
      ['pokemonDetail', selectedCard?.name],
      async () => {
        const response = await axiosInstance.get(
          `/pokemon/${selectedCard?.name}`,
        );
        return response.data;
      },
      {
        enabled: !!selectedCard?.name,
      },
    );

  const handleLoadMore = useCallback(() => {
    if (dataPokemon?.next) {
      const nextParam = getJsonFromUrl({
        url: dataPokemon?.next,
      }) as {offset: number; limit: number};
      setOffset(nextParam.offset);
    }
  }, [dataPokemon?.next]);

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

  const aref = useAnimatedRef<ScrollView>();
  const scroll = useSharedValue(0);

  useDerivedValue(() => {
    scrollTo(aref, 0, scroll.value * 100, true);
  });

  return (
    <>
      <ScrollView ref={aref}>
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
                scroll.value = scroll.value + 50;
                if (scroll.value >= 10) scroll.value = 0;
              }}>
              {t('homepage:button.Check PokèDex')}
            </Button>
          </View>
        </View>
        <View
          style={{
            height: Dimensions.get('screen').height - 50,
            backgroundColor: list.background.color,
          }}>
          {data?.length > 0 ? (
            <FlashList
              keyExtractor={item => item.name}
              ListHeaderComponent={() => (
                <ListHeaderComponent dataCount={dataPokemon?.count || 0} />
              )}
              nestedScrollEnabled
              data={data}
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
                    handleSnapPress(2);
                    setSelectedCard(item);
                  }}
                />
              )}
              // TODO add loadmore
              ListFooterComponent={() => (
                <ListFooter onPress={handleLoadMore} />
              )}
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
            <BottomSheetScrollView
              contentContainerStyle={{
                paddingBottom: 50,
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
                        <Label $isBold>{t('detailPokemon:Weight')}</Label>
                        {!!dataForBottomDetail?.weight && (
                          <Label>{dataForBottomDetail?.weight}</Label>
                        )}
                      </StyledDescriptionItemWrapper>
                      <StyledDescriptionItemWrapper>
                        <Label $isBold>{t('detailPokemon:Height')}</Label>
                        {!!dataForBottomDetail?.height && (
                          <Label>{dataForBottomDetail?.height}</Label>
                        )}
                      </StyledDescriptionItemWrapper>
                      <StyledDescriptionItemWrapper>
                        <Label $isBold>{t('detailPokemon:Abilities')}</Label>
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
                        <Label $isBold>{t('detailPokemon:Type')}</Label>
                        <StyledDescriptionItemWrapper gap={20}>
                          {dataForBottomDetail?.types.map((type, index) => {
                            if (index % 2 === 0 && index < 4) {
                              return (
                                <Badge
                                  key={type.type.name}
                                  label={type.type.name}
                                  $bgColor={colorTypeSwitcher({
                                    type: type.type.name,
                                  })}
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
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      </ScrollView>
    </>
  );
}

export default HomepageScreen;
