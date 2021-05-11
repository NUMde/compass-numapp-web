import { NUMQuestionnaireQuestion } from 'models/question';

export interface NUMQuestionnaire extends fhir.Questionnaire {}
export interface NUMQuestionnaireFlattenedItem extends fhir.QuestionnaireItem, NUMQuestionnaireQuestion {}
export type NUMQuestionnaireAnswer = (boolean | number | string)[];
export interface NumQuestionnaireExtensionConfig {
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  'questionnaire-itemControl'?: string;
  'questionnaire-sliderStepValue'?: number;
}

export interface IQuestionnaireService {
  fetch(id: string): Promise<NUMQuestionnaire>;
}
