import { API_BASE_URL, QUESTIONNAIRE_RESPONSE_TRIGGER_RULES } from 'global/constants';
import store from 'store';
import { get, post } from 'services/utils/fetch-client';
import { buildQuestionnaireResponseItem, encrypt } from 'services/utils/questionnaire';
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
          system: 'urn:ietf:rfc:3986',
        },
      },
      resourceType: 'QuestionnaireResponse',
      identifier: {
        value: `${userId}-${date.getTime()}`,
        system: 'urn:ietf:rfc:3986',
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

  generateEncryptedPayload(type, questionnaireResponse) {
    const payload = {
      type,
      data: {
        appId: store.auth.accessToken,
        ...(questionnaireResponse ? { body: questionnaireResponse } : {}),
      },
    };

    return encrypt(store.auth.certificate, payload);
  }

  buildFlags() {
    const answers = store.questionnaire.answers;
    return QUESTIONNAIRE_RESPONSE_TRIGGER_RULES.reduce(
      (flags, rule) => ({
        ...flags,
        [`updateValues[${rule.type}]`]: Object.keys(rule.answers).some((linkId) =>
          rule.answers[linkId].every((value) => (answers.get(linkId) ?? []).includes(value))
        ),
      }),
      {}
    );
  }

  async sendQuestionnaire(surveyId, instanceId) {
    const userId = store.auth.accessToken;
    const params = {
      type: 'questionnaire_response',
      id: userId,
      appId: userId,
      surveyId,
      instanceId,
      ...this.buildFlags(),
    };

    return post({
      url: `?${new URLSearchParams(params).toString()}`,
      authenticated: true,
      body: this.generateEncryptedPayload('questionnaire_response', this.buildQuestionnaireResponse()),
    });
  }
}

export * from './types';
