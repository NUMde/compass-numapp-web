import { Language } from '@d4l/web-components-library/dist/types/components/LanguageSwitcher/language-switcher';
import { Services } from 'services';
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
