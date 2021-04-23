import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import createPersistedStore from './utils/persisted-store';
import { Services } from '../services';

import { TRANSLATIONS_DE } from '../global/translations/de';
import { TRANSLATIONS_EN } from '../global/translations/en';

import { Language } from '@d4l/web-components-library/dist/types/components/LanguageSwitcher/language-switcher';
import { createStore } from '@stencil/store';

interface StateType {
  language: Language;
}

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];

const getLanguageByCode = (languageCode: Language['code']) => {
  return LANGUAGES.find(({ code }) => code === languageCode);
};

const storeBuilder = (services: Services) => {
  const { persistor } = services;
  const browserLanguage = navigator.language?.split('-')?.shift();

  const store = createPersistedStore<StateType>(persistor, 'i18n', {
    language: getLanguageByCode(browserLanguage) ?? getLanguageByCode('de'),
  });

  const forceUpdateStore = createStore<{ forceUpdate: boolean }>({
    forceUpdate: false,
  });

  store.onChange('language', async (language: Language) => {
    if (i18n.language !== language.code) {
      await i18n.changeLanguage(language.code);
    }
  });

  const languageDetector = new LanguageDetector();
  languageDetector.addDetector({
    name: 'custom',
    lookup({ lookupQuerystring }) {
      const queryMatch = document.location.href.match(new RegExp(`[?&]${lookupQuerystring}=([a-z]{2})`));
      return queryMatch?.[1] ?? store.get('language').code;
    },
    cacheUserLanguage(languageCode) {
      document.documentElement.lang = languageCode;
      store.state.language = getLanguageByCode(languageCode);
    },
  });
  const detection = {
    order: ['custom'],
    caches: ['custom'],
  };

  i18n
    .use(languageDetector)
    .init({
      detection,
      initImmediate: false,
      fallbackLng: 'de',
      whitelist: LANGUAGES.map(({ code }) => code),
      ns: ['master'],
      defaultNS: 'master',
      resources: {
        en: { master: TRANSLATIONS_EN },
        de: { master: TRANSLATIONS_DE },
      },
      nsSeparator: '#', // default is ":", and it doesn't fit well with URLs used as namespaces
      partialBundledLanguages: true,
    })
    .then(() => (store.state.language = getLanguageByCode(i18n.language)));

  i18n.on('loaded', () => {
    forceUpdateStore.set('forceUpdate', !forceUpdateStore.get('forceUpdate'));
  });

  const t: TranslateFunction = (key, ...options) => {
    options.languageCode = store.state.language.code;

    // this is a hack to force a UI re-render when new translations are loaded
    forceUpdateStore.get('forceUpdate');

    return i18n.t(key, ...options);
  };

  return {
    t,

    get language(): Language {
      return store.state.language;
    },

    set language(lang: Language) {
      store.state.language = lang;
    },
  };
};

export type TranslateFunction = (key: string, ...options: any) => string;

export default storeBuilder;
