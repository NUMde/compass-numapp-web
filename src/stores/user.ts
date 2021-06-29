import { createStore } from '@stencil/store';
import { UserResponse } from 'services/user';

interface StateType {
  isPopulated: boolean;
  isFirstTimeUser?: boolean;
  questionnaireId?: string;
  questionnaireStartDate?: Date;
  questionnaireDueDate?: Date;
  instanceId?: string;
}

const storeBuilder = () => {
  const store = createStore<StateType>({
    isPopulated: false,
  });

  class Actions {
    reset() {
      store.reset();
    }

    populateFromUserResponse(response: UserResponse) {
      store.set('isFirstTimeUser', response.firstTime);
      store.set('questionnaireId', response.current_questionnaire_id);
      store.set('questionnaireStartDate', response.start_date ? new Date(response.start_date) : null);
      store.set('questionnaireDueDate', response.due_date ? new Date(response.due_date) : null);
      store.set('instanceId', response.current_instance_id);
      store.set('isPopulated', true);
    }

    get isPopulated() {
      return store.get('isPopulated');
    }

    get isQuestionnaireAvailable() {
      const now = new Date();
      const { questionnaireStartDate: startDate, questionnaireDueDate: dueDate, questionnaireId } = this;
      return !!questionnaireId && now >= startDate && now <= dueDate;
    }

    get isFirstTimeUser() {
      return store.get('isFirstTimeUser');
    }

    get questionnaireId() {
      return store.get('questionnaireId');
    }

    get questionnaireStartDate() {
      return store.get('questionnaireStartDate');
    }

    get questionnaireDueDate() {
      return store.get('questionnaireDueDate');
    }

    get instanceId() {
      return store.get('instanceId');
    }
  }

  return new Actions();
};

export type UserStore = ReturnType<typeof storeBuilder>;

export default storeBuilder;
