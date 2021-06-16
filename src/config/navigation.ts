import { NUMFooterLink, NUMNavigationItem } from 'types';

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

export const FOOTER_LINKS: NUMFooterLink[] = [
  {
    route: ROUTES.TERMS,
    key: 'terms_of_use',
  },
  {
    route: ROUTES.PRIVACY_POLICY,
    key: 'privacy_policy',
  },
  {
    route: ROUTES.IMPRINT,
    key: 'imprint',
  },
];

export const NAVIGATION_ITEMS: NUMNavigationItem[] = [
  {
    key: 'dashboard',
    route: ROUTES.DASHBOARD,
    icon: 'explore',
    isAuthenticated: true,
  },
  {
    key: 'contact',
    url: 'https://contact.dev',
    icon: 'document',
  },
  {
    key: 'faq',
    url: 'https://faq.dev',
    icon: 'questionmark',
  },
  {
    key: 'logout',
    fn: (store) => store.auth.logout(),
    icon: 'logout',
    isAuthenticated: true,
  },
];
