import { API_BASE_URL } from 'global/constants';
import { NUMQuestionnaireQuestion } from 'models/question';
import { get } from 'services/utils/fetch-client';
import { IQuestionnaireService, NUMQuestionnaire } from './types';

export default class questionnaireService implements IQuestionnaireService {
  async fetch(id: string) {
    const [data] = await get<NUMQuestionnaire>({
      url: `${API_BASE_URL}/questionnaire/${id}`,
      authenticated: true,
    });
    return data;
  }

  flattenNestedItems(items, parent, level = 0) {
    return items
      .map((item) => new NUMQuestionnaireQuestion(item, parent, level))
      .reduce(
        (questions, item) =>
          questions.concat(item).concat(item.item ? this.flattenNestedItems(item.item, item, level + 1) : []),
        []
      );
  }

  extractQuestions(flattenedItems) {
    return flattenedItems.filter(({ type }) => type !== 'group');
  }
}

export * from './types';
