import buildAuthStore from './auth';
import buildNotificationStore from './notifications';
import buildI18nStore from './i18n';
import buildOptionalPersistenceStore from './optional-persistence';
import buildUserStore from './user';
import buildQuestionnaireStore from './questionnaire';

import services from 'services';

const stores = {
  auth: buildAuthStore(services),
  notifications: buildNotificationStore(services),
  i18n: buildI18nStore(services),
  optionalPersistence: buildOptionalPersistenceStore(services),
  user: buildUserStore(),
  questionnaire: buildQuestionnaireStore(services),
};

export type Stores = typeof stores;

export const optionalPersistence = stores.optionalPersistence;
export const user = stores.user;
export const questionnaire = stores.questionnaire;

export default stores;
