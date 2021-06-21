import { API_BASE_URL, TRIGGER_KEY_BASIC } from 'config';
import store from 'store';
import { get, post } from 'utils/fetch-client';
import { buildFlags, buildQuestionnaireResponse, generateEncryptedPayload } from 'utils/questionnaire';
import { IQuestionnaireService, NUMQuestionnaire } from './types';

export default class QuestionnaireService implements IQuestionnaireService {
  async fetch(id: string) {
    const [data] = await get<NUMQuestionnaire>({
      url: `${API_BASE_URL}/questionnaire/${id}`,
      authenticated: true,
    });
    return data;
  }

  generateEncryptedPayload(type, questionnaireResponse) {
    return generateEncryptedPayload({
      type,
      questionnaireResponse,
      accessToken: store.auth.accessToken,
      certificatePem: store.auth.certificate,
    });
  }

  async submitQuestionnaireResponse() {
    const userId = store.auth.accessToken;
    const params = {
      type: 'questionnaire_response',
      subjectId: userId,
      surveyId: store.user.questionnaireId,
      instanceId: store.user.instanceId,
      updateValues: JSON.stringify(buildFlags(store.questionnaire)),
    };

    await post({
      url: `${API_BASE_URL}/queue?${new URLSearchParams(params).toString()}`,
      authenticated: true,
      body: this.generateEncryptedPayload(
        'questionnaire_response',
        buildQuestionnaireResponse(store.auth.accessToken, store.questionnaire)
      ),
    });
  }

  async submitReport() {
    const userId = store.auth.accessToken;
    const params = {
      type: 'report',
      subjectId: userId,
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
