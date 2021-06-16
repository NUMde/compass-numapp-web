import TRANSLATIONS_DE from './translations/de';
import TRANSLATIONS_EN from './translations/en';

import { NUMLanguage } from 'types';

export const LANGUAGES: NUMLanguage[] = [
  { code: 'en', label: 'English', locale: 'en-US' },
  { code: 'de', label: 'Deutsch', locale: 'de-DE' },
];

export const TRANSLATIONS = {
  de: TRANSLATIONS_DE,
  en: TRANSLATIONS_EN,
};
