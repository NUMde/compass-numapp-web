import { IQuestionnaireService } from './types';

export default class MockQuestionnaireService implements IQuestionnaireService {
  async fetch(_id: string) {
    return {} as fhir.Questionnaire;
  }
}
