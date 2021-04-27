import MockNotifier from './notifications/mock';
import MockPersistor from './persistency/mock';
import MockUser from './user/mock';

import { Services } from '../services/types';

const buildMockServices: () => Services = () => ({
  notifier: new MockNotifier(),
  persistor: new MockPersistor(),
  user: new MockUser(),
});

export default buildMockServices;
