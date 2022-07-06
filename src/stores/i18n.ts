import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import createPersistedStore from './utils/persisted-store';
import { Services } from 'services';

import { FALLBACK_LANGUAGE_CODE, LANGUAGES, TRANSLATIONS } from 'config';
import { NUMLanguage } from 'types';

interface StateType {
  language: NUMLanguage;
}

const getLanguageByCode = (languageCode: NUMLanguage['code']) => {
  return LANGUAGES.find(({ code }) => code === languageCode);
};

const storeBuilder = ({ persistor }: Services) => {
  const browserLanguage = navigator.language?.split('-')?.shift();

  const store = createPersistedStore<StateType>(persistor, 'i18n', {
    language: getLanguageByCode(browserLanguage) ?? getLanguageByCode(FALLBACK_LANGUAGE_CODE) ?? LANGUAGES[0],
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
      return getLanguageByCode(queryMatch?.[1])?.code ?? store.get('language')?.code;
    },
    cacheUserLanguage(languageCode) {
      document.documentElement.lang = languageCode;
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
      supportedLngs: LANGUAGES.map(({ code }) => code),
      ns: ['master'],
      defaultNS: 'master',
      resources: Object.keys(TRANSLATIONS).reduce(
        (resources, code) => Object.assign(resources, { [code]: { master: TRANSLATIONS[code] } }),
        {}
      ),
    })
    .then(() => store.set('language', getLanguageByCode(i18n.language)));

  const t: TranslateFunction = (key, ...options) => {
    options.languageCode = store.get('language')?.code;
    return i18n.t(key, ...options);
  };

  return {
    t,

    get language(): NUMLanguage {
      return store.get('language');
    },

    set language(lang: NUMLanguage) {
      store.set('language', lang);
    },
  };
};

export type TranslateFunction = (key: string, ...options: any) => string;

export default storeBuilder;
