import { createStore, ObservableMap } from '@stencil/store';
import { Services } from 'services';
import createPersistedStore from './utils/persisted-store';
import {
  NUMQuestionnaireFlattenedItem,
  NUMQuestionnaire,
  NUMQuestionnaireAnswer,
} from 'services/questionnaire';
import { extractQuestions, flattenNestedItems } from 'services/utils/questionnaire';

interface StateType {
  questionnaire: NUMQuestionnaire;
  flattenedItems: NUMQuestionnaireFlattenedItem[];
  answers: ObservableMap<{ [key: string]: NUMQuestionnaireAnswer }>;
}

const storeBuilder = ({ persistor }: Services) => {
  const store = createStore<StateType>({
    questionnaire: null,
    flattenedItems: [],
    answers: createPersistedStore<{ [key: string]: NUMQuestionnaireAnswer }>(
      persistor,
      'questionnaire::answers',
      {}
    ),
  });

  class Actions {
    reset() {
      this.answers.reset();
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
