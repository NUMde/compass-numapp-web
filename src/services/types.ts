import { INotifierService } from './notifier';
import { IPersistorService } from './persistor';
import { IQuestionnaireService } from './questionnaire';
import { IUserService } from './user';

export interface Services {
  notifier: INotifierService;
  persistor: IPersistorService;
  user: IUserService;
  questionnaire: IQuestionnaireService;
}
