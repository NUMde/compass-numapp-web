import { Env } from '@stencil/core';
import { Language } from '@d4l/web-components-library/dist/types/components/LanguageSwitcher/language-switcher';

import TRANSLATIONS_DE from '../global/translations/de';
import TRANSLATIONS_EN from '../global/translations/en';

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

export const APP_LANGUAGES: Language[] = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];

export const APP_TRANSLATIONS = {
  de: TRANSLATIONS_DE,
  en: TRANSLATIONS_EN,
};

export const FHIR_CODE_YES = 'LA33-6';
export const FHIR_CODE_NO = 'LA32-8';

/**
 * TODO: Get the following values from env or separate config file instead
 */

export const SUPPORT_QR_CODE = true;
export const SHOW_LOGOUT = true;

export const APP_NAME = 'COMPASS';
export const QR_PROP_APP_NAME = 'AppName';
export const QR_PROP_USER_ID = 'AppID';

export const { API_BASE_URL, ENVIRONMENT } = Env;
