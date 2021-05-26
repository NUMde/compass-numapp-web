import { API_BASE_URL } from 'global/constants';
import store from 'store';
import { get } from 'services/utils/fetch-client';
import { buildQuestionnaireResponseItem } from 'services/utils/questionnaire';
import { IQuestionnaireService, NUMQuestionnaire } from './types';

export default class QuestionnaireService implements IQuestionnaireService {
  async fetch(id: string) {
    const [data] = await get<NUMQuestionnaire>({
      url: `${API_BASE_URL}/questionnaire/${id}`,
      authenticated: true,
    });
    return data;
  }

  buildQuestionnaireResponse() {
    const date = new Date();
    const userId = store.auth.accessToken;
    const { flattenedItems, questionnaire } = store.questionnaire;
    const isCompleted = flattenedItems
      .filter(({ isAnswerable }) => isAnswerable)
      .every(({ isAnswered }) => isAnswered);

    return {
      author: {
        identifier: {
          value: userId,
        },
      },
      resourceType: 'QuestionnaireResponse',
      identifier: {
        value: `${userId}-${date.getTime()}`,
      },
      status: (isCompleted ? 'completed' : 'in-progress') as fhir.QuestionnaireResponseStatus,
      authored: date.toISOString(),
      questionnaire: [questionnaire.url, questionnaire.version]
        .filter((segment) => (typeof segment === 'string' && !!segment) || typeof segment === 'number')
        .join('|'),
      item:
        questionnaire.item
          ?.map((item) => buildQuestionnaireResponseItem(flattenedItems, item.linkId))
          .filter(Boolean) ?? [],
    };
  }
}

export * from './types';
