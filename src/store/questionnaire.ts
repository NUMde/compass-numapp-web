import { createStore, ObservableMap } from '@stencil/store';
import { Services } from 'services';
import createPersistedStore from './utils/persisted-store';
import {
  NUMQuestionnaireFlattenedItem,
  NUMQuestionnaire,
  NUMQuestionnaireAnswer,
} from 'services/questionnaire';
import { extractQuestions, flattenNestedItems, getHash } from 'utils/questionnaire';

interface StateType {
  questionnaire: NUMQuestionnaire;
  flattenedItems: NUMQuestionnaireFlattenedItem[];
  answers: ObservableMap<{ [key: string]: NUMQuestionnaireAnswer }>;
  persistedMeta: ObservableMap<PersistedMetaStateType>;
}

interface PersistedMetaStateType {
  hash: string;
}

const storeBuilder = ({ optionalPersistor }: Services) => {
  const store = createStore<StateType>({
    questionnaire: null,
    flattenedItems: [],
    answers: createPersistedStore<{ [key: string]: NUMQuestionnaireAnswer }>(
      optionalPersistor,
      'questionnaire::answers',
      {}
    ),
    persistedMeta: createPersistedStore<PersistedMetaStateType>(optionalPersistor, 'questionnaire', {
      hash: null,
    }),
  });

  class Actions {
    reset() {
      this.answers.reset();
      this.persistedMeta.reset();
      store.reset();
    }

    populateFromRequestResponse(response: NUMQuestionnaire) {
      store.set('questionnaire', response);
      store.set('flattenedItems', flattenNestedItems(response.item ?? [], response));

      const { hash } = this;
      const persistedMeta = store.get('persistedMeta');
      persistedMeta.get('hash') !== hash && this.answers.reset();
      persistedMeta.set('hash', hash);
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

    get hash() {
      return getHash(JSON.stringify(this.questionnaire));
    }

    get persistedMeta() {
      return store.get('persistedMeta');
    }

    get isCompleted() {
      return this.questions
        .filter(({ isEnabled }) => isEnabled)
        .every(({ isAnswered, answer }) => isAnswered && Array.isArray(answer));
    }
  }

  return new Actions();
};

export type QuestionnaireStore = ReturnType<typeof storeBuilder>;

export default storeBuilder;
