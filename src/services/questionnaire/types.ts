import { NUMQuestionnaireQuestion } from 'models/question';

export interface NUMQuestionnaire extends fhir.Questionnaire {}
export interface NUMQuestionnaireFlattenedItem extends fhir.QuestionnaireItem, NUMQuestionnaireQuestion {}
export type NUMQuestionnaireAnswer = (boolean | number | string)[];

export interface IQuestionnaireService {
  fetch(id: string): Promise<NUMQuestionnaire>;
  flattenNestedItems(
    items: fhir.QuestionnaireItem[],
    parent: fhir.Questionnaire | fhir.QuestionnaireItem
  ): NUMQuestionnaireFlattenedItem[];
  extractQuestions(flattenedItems: NUMQuestionnaireFlattenedItem[]): NUMQuestionnaireFlattenedItem[];
}
