import { Language } from '@d4l/web-components-library/dist/types/components/LanguageSwitcher/language-switcher';
import { Services } from 'services';
import { NUMQuestionnaireAnswer } from 'services/questionnaire';
import { Stores } from 'stores';

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
  fn?: (stores: Stores, services: Services) => void;
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
  FEATURES_AUTO_LOGOUT?: boolean;
  FEATURES_SUPPORT_QR_CODE?: boolean;
  FEATURES_QUESTIONNAIRE_ALLOW_FUTURE_DATES?: boolean;
  FEATURES_QUESTIONNAIRE_SHOW_LINKIDS?: boolean;
  FEATURES_QUESTIONNAIRE_SHOW_TREE?: boolean;
  PERSISTENCE_SHOW_CHOICE?: boolean;
  AUTO_LOGOUT_COUNTDOWN?: number;
  QR_APP_NAME?: string;
  QR_PROP_APP_NAME?: string;
  QR_PROP_USER_ID?: string;
  TRIGGER_KEY_BASIC?: string;
  TRIGGER_KEY_SPECIAL?: string;
  TRIGGER_RULES?: NUMTriggerRule[];
  QUESTIONNAIRE_TREE_SHOW_DISABLED_ITEMS?: boolean;
  FHIR_SUPPORTED_EXTENSION_BASE_URLS?: string[];
  FHIR_RESPONSE_TRANSFERRED_EXTENSION_KEYS?: string[];
  LANGUAGES?: NUMLanguage[];
  TRANSLATIONS?: {
    [languageCode: string]: object;
  };
  FALLBACK_LANGUAGE_CODE?: string;
  ROUTES?: { [key: string]: string };
  FOOTER_LINKS?: NUMFooterLink[];
  NAVIGATION_ITEMS?: NUMNavigationItem[];
  API_QUESTIONNAIRE_URI?: string;
  API_QUEUE_URI?: string;
  API_USER_URI?: string;
}
