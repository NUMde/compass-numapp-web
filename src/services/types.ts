import { INotifier } from './notifications';
import { IPersistor } from './persistency';

export interface Services {
  notifier: INotifier;
  persistor: IPersistor;
}
