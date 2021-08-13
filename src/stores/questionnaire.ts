import { createStore } from '@stencil/store';
import { Services } from 'services';
import createPersistedStore from './utils/persisted-store';
import {
  NUMQuestionnaireFlattenedItem,
  NUMQuestionnaire,
  NUMQuestionnaireAnswer,
} from 'services/questionnaire';
import { extractQuestions, flattenNestedItems, getHash } from 'utils/questionnaire';
import { optionalPersistence } from 'stores';

interface StateType {
  questionnaire: NUMQuestionnaire;
  flattenedItems: NUMQuestionnaireFlattenedItem[];
}

interface PersistedMetaStateType {
  hash: string;
}

const storeBuilder = ({ optionalPersistor }: Services) => {
  const store = createStore<StateType>({
    questionnaire: null,
    flattenedItems: [],
  });

  const answersStore = createPersistedStore<{ [key: string]: NUMQuestionnaireAnswer }>(
    optionalPersistor,
    'questionnaire::answers',
    {}
  );

  const persistedMetaStore = createPersistedStore<PersistedMetaStateType>(
    optionalPersistor,
    'questionnaire::meta',
    { hash: null }
  );

  class Actions {
    constructor() {
      answersStore.on('set', () => {
        this.isPristine ? optionalPersistence.removeLeaveGuard() : optionalPersistence.addLeaveGuard();
        this.resetIsAnsweredCache();
      });
      answersStore.on('reset', () => optionalPersistence.removeLeaveGuard());
    }

    reset() {
      answersStore.reset();
      persistedMetaStore.reset();
      store.reset();
    }

    resetIsAnsweredCache() {
      this.flattenedItems?.forEach((item) => item.resetIsAnsweredCache());
    }

    populateFromRequestResponse(response: NUMQuestionnaire) {
      store.set('questionnaire', response);
      store.set('flattenedItems', flattenNestedItems(response.item ?? [], response));

      const { hash } = this;
      persistedMetaStore.get('hash') !== hash && answersStore.reset();
      persistedMetaStore.set('hash', hash);
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
      return answersStore;
    }

    get hash() {
      return getHash(JSON.stringify(this.questionnaire));
    }

    get persistedMeta() {
      return persistedMetaStore;
    }

    get isCompleted() {
      return this.questions.filter(({ isEnabled }) => isEnabled).every(({ isAnswered }) => isAnswered);
    }

    get isPristine() {
      return !this.questions.filter(({ isEnabled }) => isEnabled).some(({ isAnswered }) => isAnswered);
    }
  }

  return new Actions();
};

export type QuestionnaireStore = ReturnType<typeof storeBuilder>;

export default storeBuilder;
