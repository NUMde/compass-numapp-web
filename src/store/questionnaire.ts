import { createStore } from '@stencil/store';
import {
  NUMQuestionnaireFlattenedItem,
  NUMQuestionnaire,
  NUMQuestionnaireAnswer,
} from 'services/questionnaire';
import { extractQuestions, flattenNestedItems } from 'services/utils/questionnaire';

interface StateType {
  questionnaire: NUMQuestionnaire;
  flattenedItems: NUMQuestionnaireFlattenedItem[];
  answers: Map<string, NUMQuestionnaireAnswer>;
}

const storeBuilder = () => {
  const store = createStore<StateType>({
    questionnaire: null,
    flattenedItems: [],
    answers: new Map<string, NUMQuestionnaireAnswer>(),
  });

  class Actions {
    reset() {
      store.reset();
    }

    populateFromRequestResponse(response: NUMQuestionnaire) {
      store.set('questionnaire', response);
      store.set('flattenedItems', flattenNestedItems(response.item ?? [], response));
    }

    get isPopulated() {
      return !!this.questionnaire;
    }

    get questionnaire() {
      return store.get('questionnaire');
    }

    get flattenedItems() {
      return store.get('flattenedItems');
    }

    get questions() {
      return extractQuestions(this.flattenedItems);
    }

    get answers() {
      return store.get('answers');
    }
  }

  return new Actions();
};

export type UserStore = ReturnType<typeof storeBuilder>;

export default storeBuilder;
