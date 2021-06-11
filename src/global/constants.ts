import { Env } from '@stencil/core';

import TRANSLATIONS_DE from '../global/translations/de';
import TRANSLATIONS_EN from '../global/translations/en';
import { NUMLanguage } from 'store/i18n';

export const ROUTES = {
  ROOT: '/',
  TERMS: '/terms',
  PRIVACY_POLICY: '/privacy-policy',
  IMPRINT: '/imprint',
  AUTHENTICATE: '/connect',
  DASHBOARD: '/dashboard',
  QUESTIONNAIRE: '/questionnaire',
  REPORT: '/report',
};

export const APP_LANGUAGES: NUMLanguage[] = [
  { code: 'en', label: 'English', locale: 'en-US' },
  { code: 'de', label: 'Deutsch', locale: 'de-DE' },
];

export const APP_TRANSLATIONS = {
  de: TRANSLATIONS_DE,
  en: TRANSLATIONS_EN,
};

/**
 * TODO: Get the following values from env or separate config file instead
 */

export const SUPPORT_QR_CODE = true;
export const SHOW_LOGOUT = true;

export const APP_NAME = 'COMPASS';
export const QR_PROP_APP_NAME = 'AppName';
export const QR_PROP_USER_ID = 'AppID';

export const TRIGGER_KEY_BASIC = 'basicTrigger';
export const TRIGGER_KEY_SPECIAL = 'specialTrigger';

export const QUESTIONNAIRE_ALLOW_FUTURE_DATES = true;
export const QUESTIONNAIRE_RESPONSE_TRIGGER_RULES = [
  {
    type: TRIGGER_KEY_BASIC,
    answers: {
      '1.11': ['Option A'],
      '1.10.1': [true],
    },
  },
  {
    type: TRIGGER_KEY_SPECIAL,
    answers: {
      '1.18': ['Special trigger answer'],
    },
  },
];

export const { API_BASE_URL, ENVIRONMENT, FALLBACK_CERTIFICATE } = Env;
