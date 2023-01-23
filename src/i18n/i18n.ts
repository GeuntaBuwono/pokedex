// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
import i18n from 'i18next';
import common from 'locales/en/common.json';
import detailPokemon from 'locales/en/screen.detailPokemon.json';
import homepage from 'locales/en/screen.homepage.json';
import pokemonType from 'locales/en/screen.pokemonType.json';
import {initReactI18next} from 'react-i18next';

export const defaultNS = 'common';
export const resources = {
  en: {
    common,
    detailPokemon,
    homepage,
    pokemonType,
  },
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
  ns: ['common', 'homepage'],
  defaultNS,
  resources,
  react: {useSuspense: false},
});

export default i18n;
