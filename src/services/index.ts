import Notifier from './notifications';
import StoragePersistor from './persistency';
import { Services } from './types';

let storage: Storage;
try {
  storage = window.localStorage;
} catch (error) {
  console.error('localStorage unavailable: ', error);
}

const services: Services = {
  persistor: new StoragePersistor(storage),
  notifier: new Notifier(),
};

export * from './types';

export default services;
