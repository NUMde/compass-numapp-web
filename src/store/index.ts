import buildAuthStore from './auth';
import buildNotificationStore from './notifications';
import buildI18nStore from './i18n';
import buildUserStore from './user';

import services from '../services';

const store = {
  auth: buildAuthStore(services),
  notifications: buildNotificationStore(services),
  i18n: buildI18nStore(services),
  user: buildUserStore(),
};

export type Store = typeof store;

export default store;
