import { API_BASE_URL, TRIGGER_KEY_BASIC, TRIGGER_RULES } from 'config';
import store from 'store';
import { get, post } from 'utils/fetch-client';
import { buildQuestionnaireResponseItem, encrypt } from 'utils/questionnaire';
import { IQuestionnaireService, NUMQuestionnaire } from './types';

export default class QuestionnaireService implements IQuestionnaireService {
  async fetch(id: string) {
    const [data] = await get<NUMQuestionnaire>({
      url: `${API_BASE_URL}/questionnaire/${id}`,
      authenticated: true,
    });
    return data;
  }

  buildQuestionnaireResponse(): fhir4.QuestionnaireResponse {
    const date = new Date();
    const userId = store.auth.accessToken;
    const { flattenedItems, questionnaire, isCompleted } = store.questionnaire;

    return {
      author: {
        identifier: {
          value: `urn:uuid:${userId}`,
          system: 'urn:ietf:rfc:3986',
        },
      },
      resourceType: 'QuestionnaireResponse',
      identifier: {
        value: `urn:uuid:${userId}-response-${date.getTime()}`,
        system: 'urn:ietf:rfc:3986',
      },
      status: isCompleted ? 'completed' : 'in-progress',
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

    return JSON.stringify({ payload: encrypt(store.auth.certificate, payload) });
  }

  buildFlags() {
    const answers = store.questionnaire.answers;
    return TRIGGER_RULES.reduce(
      (flags, rule) => ({
        ...flags,
        [rule.type]: String(
          Object.keys(rule.answers).some((linkId) =>
            rule.answers[linkId].every((value) => (answers.get(linkId) ?? []).includes(value))
          )
        ),
      }),
      {}
    );
  }

  async submitQuestionnaireResponse() {
    const userId = store.auth.accessToken;
    const params = {
      type: 'questionnaire_response',
      id: userId,
      appId: userId,
      surveyId: store.user.questionnaireId,
      instanceId: store.user.instanceId,
      updateValues: JSON.stringify(this.buildFlags()),
    };

    await post({
      url: `${API_BASE_URL}/queue?${new URLSearchParams(params).toString()}`,
      authenticated: true,
      body: this.generateEncryptedPayload('questionnaire_response', this.buildQuestionnaireResponse()),
    });
  }

  async submitReport() {
    const userId = store.auth.accessToken;
    const params = {
      type: 'report',
      appId: userId,
      updateValues: JSON.stringify({ [TRIGGER_KEY_BASIC]: true }),
    };

    await post({
      url: `${API_BASE_URL}/queue?${new URLSearchParams(params).toString()}`,
      authenticated: true,
      body: this.generateEncryptedPayload('report', {}),
    });
  }
}

export * from './types';
