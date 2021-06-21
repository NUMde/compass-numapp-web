import { IQuestionnaireService } from './types';

export default class MockQuestionnaireService implements IQuestionnaireService {
  async fetch(_id: string) {
    return {} as fhir4.Questionnaire;
  }

  generateEncryptedPayload() {
    return '';
  }

  async submitQuestionnaireResponse() {}
  async submitReport() {}
}
