import { IQuestionnaireService } from './types';

export default class MockQuestionnaireService implements IQuestionnaireService {
  async fetch(_id: string) {
    return {} as fhir.Questionnaire;
  }

  flattenNestedItems(_items, _parent) {
    return [];
  }

  extractQuestions(_items) {
    return [];
  }
}
