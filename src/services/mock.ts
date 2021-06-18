import MockNotifierService from './notifier/mock';
import MockPersistorService from './persistor/mock';
import MockUserService from './user/mock';
import MockQuestionnaireService from './questionnaire/mock';

import { Services } from 'services/types';

const buildMockServices: () => Services = () => ({
  notifier: new MockNotifierService(),
  persistor: new MockPersistorService(null),
  user: new MockUserService(),
  questionnaire: new MockQuestionnaireService(),
});

export default buildMockServices;
