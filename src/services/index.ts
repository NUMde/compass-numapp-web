import InactivityService from './inactivity';
import NotifierService from './notifier';
import PersistorService from './persistor';
import QuestionnaireService from './questionnaire';
import UserService from './user';

import { Services } from './types';
import { STORAGE } from 'utils/storage';

/**
 * Difference between persistor and optionalPersistor:
 * The optional persistor can be turned off by the user while authenticating
 * if the feature flag is enabled (by unchecking "Stay logged in").
 * This way, data like the access token, questionnaire hash and unsubmitted
 * questionnaire answers will not be persisted in localStorage.
 * There are other settings such as the user language that are always persisted
 * (if FEATURES_ENABLE_PERSISTENCE feature flag is true and localStorage is available).
 * For those, the "regular" persistor is used.
 */

const services: Services = {
  inactivity: new InactivityService(),
  notifier: new NotifierService(),
  optionalPersistor: new PersistorService(STORAGE),
  persistor: new PersistorService(STORAGE),
  questionnaire: new QuestionnaireService(),
  user: new UserService(),
};

export * from './types';

export default services;
