import { createStore } from '@stencil/store';
import { UserResponse } from 'services/user';

interface StateType {
  isPopulated: boolean;
  isFirstTimeUser?: boolean;
  questionnaireId?: string;
  questionnaireStartDate?: Date;
  questionnaireDueDate?: Date;
}

const storeBuilder = () => {
  const store = createStore<StateType>({
    isPopulated: false,
  });

  class Actions {
    populateFromUserResponse(userResponse: UserResponse) {
      store.set('isFirstTimeUser', userResponse.firstTime);
      store.set('questionnaireId', userResponse.current_questionnaire_id);
      store.set('questionnaireStartDate', userResponse.start_date ? new Date(userResponse.start_date) : null);
      store.set('questionnaireDueDate', userResponse.due_date ? new Date(userResponse.due_date) : null);
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
  }

  return new Actions();
};

export type UserStore = ReturnType<typeof storeBuilder>;

export default storeBuilder;