import { INotifier } from './notifications';
import { IPersistor } from './persistency';
import { IUser } from './user';

export interface Services {
  notifier: INotifier;
  persistor: IPersistor;
  user: IUser;
}
