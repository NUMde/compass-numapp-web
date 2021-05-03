export interface NUMQuestionnaire extends fhir.Questionnaire {}
export interface NUMQuestionnaireFlattenedItem extends fhir.QuestionnaireItem {
  parent: fhir.Questionnaire | fhir.QuestionnaireItem;
  level: number;
}

export interface IQuestionnaireService {
  fetch(id: string): Promise<NUMQuestionnaire>;
  flattenNestedItems(
    items: fhir.QuestionnaireItem[],
    parent: fhir.Questionnaire | fhir.QuestionnaireItem
  ): NUMQuestionnaireFlattenedItem[];
  extractQuestions(flattenedItems: NUMQuestionnaireFlattenedItem[]): NUMQuestionnaireFlattenedItem[];
}
