import { NUMQuestionnaireQuestion } from 'models/question';

export interface NUMQuestionnaire extends fhir4.Questionnaire {}
export interface NUMQuestionnaireFlattenedItem extends fhir4.QuestionnaireItem, NUMQuestionnaireQuestion {}
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
  buildQuestionnaireResponse(): fhir4.QuestionnaireResponse;
  generateEncryptedPayload(
    type: 'report' | 'questionnaire_response',
    questionnaireResponse?: fhir4.QuestionnaireResponse
  ): string;
  submitQuestionnaireResponse(): Promise<unknown>; // TODO add response type
}
