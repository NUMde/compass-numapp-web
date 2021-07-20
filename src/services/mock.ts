import MockInactivityService from './inactivity/mock';
import MockNotifierService from './notifier/mock';
import MockPersistorService from './persistor/mock';
import MockUserService from './user/mock';
import MockQuestionnaireService from './questionnaire/mock';

import { Services } from 'services/types';

const buildMockServices: () => Services = () => ({
  inactivity: new MockInactivityService(),
  notifier: new MockNotifierService(),
  optionalPersistor: new MockPersistorService(null),
  persistor: new MockPersistorService(null),
  user: new MockUserService(),
  questionnaire: new MockQuestionnaireService(),
});

export default buildMockServices;
