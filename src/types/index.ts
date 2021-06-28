import { Language } from '@d4l/web-components-library/dist/types/components/LanguageSwitcher/language-switcher';
import { Services } from 'services';
import { NUMQuestionnaireAnswer } from 'services/questionnaire';
import { Store } from 'store';

export interface NUMLanguage extends Language {
  locale?: string;
}

export interface NUMFooterLink {
  key: string;
  url?: string;
  route?: string;
  isAuthenticated?: boolean;
}

export interface NUMNavigationItem {
  key: string;
  icon?: string;
  url?: string;
  route?: string;
  fn?: (store: Store, services: Services) => void;
  isAuthenticated?: boolean;
}

export interface NUMTriggerRule {
  type: string;
  answers: {
    [linkId: string]: NUMQuestionnaireAnswer;
  };
}
export interface NUMCustomAppConfig {
  FEATURES_ENABLE_PERSISTENCE?: boolean;
  FEATURES_SHOW_LOGOUT?: boolean;
  FEATURES_SUPPORT_QR_CODE?: boolean;
  FEATURES_QUESTIONNAIRE_ALLOW_FUTURE_DATES?: boolean;
  FEATURES_QUESTIONNAIRE_SHOW_LINKIDS?: boolean;
  PERSISTENCE_SHOW_CHOICE?: boolean;
  QR_APP_NAME?: string;
  QR_PROP_APP_NAME?: string;
  QR_PROP_USER_ID?: string;
  TRIGGER_KEY_BASIC?: string;
  TRIGGER_KEY_SPECIAL?: string;
  TRIGGER_RULES?: NUMTriggerRule[];
  FHIR_SUPPORTED_EXTENSION_BASE_URLS?: string[];
  LANGUAGES?: NUMLanguage[];
  TRANSLATIONS?: {
    [languageCode: string]: object;
  };
  FALLBACK_LANGUAGE_CODE?: string;
  ROUTES?: { [key: string]: string };
  FOOTER_LINKS?: NUMFooterLink[];
  NAVIGATION_ITEMS?: NUMNavigationItem[];
}
