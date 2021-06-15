import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import createPersistedStore from './utils/persisted-store';
import { Services } from '../services';

import { createStore } from '@stencil/store';
import { APP_LANGUAGES, APP_TRANSLATIONS } from 'global/constants';
import { NUMLanguage } from 'types';

interface StateType {
  language: NUMLanguage;
}

const getLanguageByCode = (languageCode: NUMLanguage['code']) => {
  return APP_LANGUAGES.find(({ code }) => code === languageCode);
};

const storeBuilder = ({ persistor }: Services) => {
  const browserLanguage = navigator.language?.split('-')?.shift();

  const store = createPersistedStore<StateType>(persistor, 'i18n', {
    language: getLanguageByCode(browserLanguage) ?? getLanguageByCode('de'),
  });

  const forceUpdateStore = createStore<{ forceUpdate: boolean }>({
    forceUpdate: false,
  });

  store.onChange('language', async (language: NUMLanguage) => {
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
      whitelist: APP_LANGUAGES.map(({ code }) => code),
      ns: ['master'],
      defaultNS: 'master',
      resources: Object.keys(APP_TRANSLATIONS).reduce(
        (resources, code) => Object.assign(resources, { [code]: { master: APP_TRANSLATIONS[code] } }),
        {}
      ),
      nsSeparator: '#', // default is ":", and it doesn't fit well with URLs used as namespaces
      partialBundledLanguages: true,
    })
    .then(() => (store.state.language = getLanguageByCode(i18n.language)));

  i18n.on('loaded', () => {
    forceUpdateStore.set('forceUpdate', !forceUpdateStore.get('forceUpdate'));
  });

  const t: TranslateFunction = (key, ...options) => {
    options.languageCode = store.state.language.code;
    return i18n.t(key, ...options);
  };

  return {
    t,

    get language(): NUMLanguage {
      return store.state.language;
    },

    set language(lang: NUMLanguage) {
      store.state.language = lang;
    },
  };
};

export type TranslateFunction = (key: string, ...options: any) => string;

export default storeBuilder;
