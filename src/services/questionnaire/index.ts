import { API_BASE_URL, API_QUESTIONNAIRE_URI, API_QUEUE_URI, TRIGGER_KEY_BASIC } from 'config';
import stores from 'stores';
import { get, post } from 'utils/fetch-client';
import { buildFlags, buildQuestionnaireResponse, generateEncryptedPayload } from 'utils/questionnaire';
import { IQuestionnaireService, NUMQuestionnaire } from './types';

export default class QuestionnaireService implements IQuestionnaireService {
  async fetch(id: string) {
    const [data] = await get<NUMQuestionnaire>({
      url: `${API_BASE_URL}/${API_QUESTIONNAIRE_URI.replace(':id', encodeURIComponent(id))}`,
      authenticated: true,
    });
    return data;
  }

  generateEncryptedPayload(type, questionnaireResponse) {
    return generateEncryptedPayload({
      type,
      questionnaireResponse,
      accessToken: stores.auth.accessToken,
      certificatePem: stores.auth.certificate,
    });
  }

  async submitQuestionnaireResponse() {
    const userId = stores.auth.accessToken;
    const params = {
      type: 'questionnaire_response',
      subjectId: userId,
      surveyId: stores.user.questionnaireId,
      instanceId: stores.user.instanceId,
      updateValues: JSON.stringify(buildFlags(stores.questionnaire)),
    };

    await post({
      url: `${API_BASE_URL}/${API_QUEUE_URI}?${new URLSearchParams(params).toString()}`,
      authenticated: true,
      body: this.generateEncryptedPayload(
        'questionnaire_response',
        buildQuestionnaireResponse(stores.auth.accessToken, stores.questionnaire)
      ),
    });
  }

  async submitReport() {
    const userId = stores.auth.accessToken;
    const params = {
      type: 'report',
      subjectId: userId,
      updateValues: JSON.stringify({ [TRIGGER_KEY_BASIC]: true }),
    };

    await post({
      url: `${API_BASE_URL}/${API_QUEUE_URI}?${new URLSearchParams(params).toString()}`,
      authenticated: true,
      body: this.generateEncryptedPayload('report', {}),
    });
  }
}

export * from './types';
