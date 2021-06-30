import { NUMQuestionnaireQuestion } from 'models/question';

export interface NUMQuestionnaire extends fhir4.Questionnaire {}
export interface NUMQuestionnaireFlattenedItem extends fhir4.QuestionnaireItem, NUMQuestionnaireQuestion {}
export type NUMQuestionnaireSimpleValue = string | number | boolean;
export type NUMQuestionnaireAnswer = NUMQuestionnaireSimpleValue[];
export interface NUMQuestionnaireExtensionConfig {
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  'questionnaire-hidden'?: boolean;
  'questionnaire-itemControl'?: string;
  'questionnaire-sliderStepValue'?: number;
  LowRangeLabel?: string;
  HighRangeLabel?: string;
}

export interface IQuestionnaireService {
  fetch(id: string): Promise<NUMQuestionnaire>;
  generateEncryptedPayload(
    type: 'report' | 'questionnaire_response',
    questionnaireResponse?: fhir4.QuestionnaireResponse
  ): string;
  submitQuestionnaireResponse(): Promise<void>;
  submitReport(): Promise<void>;
}
