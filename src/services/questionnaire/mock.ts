import { IQuestionnaireService } from './types';

export default class MockQuestionnaireService implements IQuestionnaireService {
  async fetch(_id: string) {
    return {} as fhir4.Questionnaire;
  }

  buildQuestionnaireResponse(): fhir4.QuestionnaireResponse {
    return {
      resourceType: 'QuestionnaireResponse',
      status: 'completed',
      questionnaire: 'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel|1.2',
    };
  }

  generateEncryptedPayload() {
    return '';
  }

  async submitQuestionnaireResponse() {}
  async submitReport() {}
}
