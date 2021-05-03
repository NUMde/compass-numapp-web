import NotifierService from './notifier';
import UserService from './user';
import PersistorService from './persistor';
import QuestionnaireService from './questionnaire';

import { Services } from './types';

let storage: Storage;
try {
  storage = window.localStorage;
} catch (error) {
  console.error('localStorage unavailable: ', error);
}

const services: Services = {
  persistor: new PersistorService(storage),
  notifier: new NotifierService(),
  user: new UserService(),
  questionnaire: new QuestionnaireService(),
};

export * from './types';

export default services;
