import buildAuthStore from './auth';
import buildNotificationStore from './notifications';
import buildI18nStore from './i18n';
import buildOptionalPersistenceStore from './optional-persistence';
import buildUserStore from './user';
import buildQuestionnaireStore from './questionnaire';

import services from '../services';

const store = {
  auth: buildAuthStore(services),
  notifications: buildNotificationStore(services),
  i18n: buildI18nStore(services),
  optionalPersistence: buildOptionalPersistenceStore(services),
  user: buildUserStore(),
  questionnaire: buildQuestionnaireStore(services),
};

export type Store = typeof store;

export const optionalPersistence = store.optionalPersistence;
export const user = store.user;
export const questionnaire = store.questionnaire;

export default store;
