import { h } from '@stencil/core';
import { FEATURES_QUESTIONNAIRE_ALLOW_FUTURE_DATES } from 'config';
import stores from 'stores';
import { QuestionnaireQuestionComponentProps } from './types';

const getTimelessDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const DateQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  const { i18n } = stores;
  const [year, month, day] = String(answer[0])
    .split(/[^0-9]/)
    .filter(Boolean);

  const { minValue, maxValue } = question.config;
  const minDate = minValue ? getTimelessDate(new Date(minValue)) : null;
  const maxDate = maxValue ? getTimelessDate(new Date(maxValue)) : null;

  return (
    <d4l-date-input
      class="questionnaire-question__date-input"
      label=" "
      errorMessage={i18n.t('questionnaire.date_input.error')}
      hiddenLabels
      fields={{
        day: {
          label: i18n.t('questionnaire.date_input.day'),
          placeholder: i18n.t('questionnaire.date_input.day'),
          value: day ?? null,
        },
        month: {
          label: i18n.t('questionnaire.date_input.month'),
          placeholder: i18n.t('questionnaire.date_input.month'),
          value: month ?? null,
        },
        year: {
          label: i18n.t('questionnaire.date_input.year'),
          placeholder: i18n.t('questionnaire.date_input.year'),
          value: year ?? null,
        },
      }}
      futureAllowed={FEATURES_QUESTIONNAIRE_ALLOW_FUTURE_DATES}
      min={minDate}
      max={maxDate}
      required={question.required ?? false}
      handleChange={(date: string) => onChange(question.linkId, date)}
      enableDatePicker
      datePickerText={i18n.t('questionnaire.date_input.open_date_picker')}
    />
  );
};
