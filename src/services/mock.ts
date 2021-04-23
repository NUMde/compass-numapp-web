import MockNotifier from '../services/notifications/mock';
import MockPersistor from '../services/persistency/mock';

import { Services } from '../services/types';

const buildMockServices: () => Services = () => ({
  notifier: new MockNotifier(),
  persistor: new MockPersistor(),
});

export default buildMockServices;
