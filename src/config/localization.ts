import CUSTOM from 'custom/config';

import TRANSLATIONS_DE from './translations/de';
import TRANSLATIONS_EN from './translations/en';

import { NUMLanguage } from 'types';

export const LANGUAGES: NUMLanguage[] = CUSTOM.LANGUAGES ?? [
  { code: 'en', label: 'English', locale: 'en-US' },
  { code: 'de', label: 'Deutsch', locale: 'de-DE' },
];

export const TRANSLATIONS = CUSTOM.TRANSLATIONS ?? {
  de: TRANSLATIONS_DE,
  en: TRANSLATIONS_EN,
};

export const FALLBACK_LANGUAGE_CODE = CUSTOM.FALLBACK_LANGUAGE_CODE ?? 'de';
