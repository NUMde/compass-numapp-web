import { createStore } from '@stencil/store';
import { Services } from 'services';
import { NUMQuestionnaireFlattenedItem, NUMQuestionnaire } from 'services/questionnaire';

interface StateType {
  questionnaire: NUMQuestionnaire;
  flattenedItems: NUMQuestionnaireFlattenedItem[];
}

const storeBuilder = ({ questionnaire: questionnaireService }: Services) => {
  const store = createStore<StateType>({
    questionnaire: null,
    flattenedItems: [],
  });

  class Actions {
    reset() {
      store.reset();
    }

    populateFromRequestResponse(response: NUMQuestionnaire) {
      store.set('questionnaire', response);
      store.set('flattenedItems', questionnaireService.flattenNestedItems(response.item ?? [], response));
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
      return questionnaireService.extractQuestions(this.flattenedItems);
    }
  }

  return new Actions();
};

export type UserStore = ReturnType<typeof storeBuilder>;

export default storeBuilder;
