import { IQuestionnaireService } from './types';

export default class MockQuestionnaireService implements IQuestionnaireService {
  async fetch(_id: string) {
    return {} as fhir.Questionnaire;
  }

  buildQuestionnaireResponse() {
    return {
      status: 'completed' as fhir.QuestionnaireResponseStatus,
      questionnaire: 'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel|1.2',
    };
  }

  generateEncryptedPayload() {
    return '';
  }
}
