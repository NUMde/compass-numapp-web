import { h } from '@stencil/core';
import store from 'store';
import { QuestionnaireQuestionComponentProps } from './types';

const getTimelessDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const DateQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  const { i18n } = store;
  const [year, month, day] = String(answer[0])
    .split(/[^0-9]/)
    .filter(Boolean);

  const { minValue, maxValue } = question.config;
  const minDate = minValue ? getTimelessDate(new Date(minValue)) : null;
  const maxDate = maxValue ? getTimelessDate(new Date(maxValue)) : null;

  return (
    <d4l-date-input
      label=" "
      errorMessage={i18n.t('questionnaire.date_input.error')}
      hiddenLabels
      fields={{
        day: {
          label: null,
          placeholder: i18n.t('questionnaire.date_input.day'),
          value: day ?? null,
        },
        month: {
          label: null,
          placeholder: i18n.t('questionnaire.date_input.month'),
          value: month ?? null,
        },
        year: {
          label: null,
          placeholder: i18n.t('questionnaire.date_input.year'),
          value: year ?? null,
        },
      }}
      futureAllowed={!!maxDate}
      min={minDate}
      max={maxDate}
      handleChange={(date: string) => onChange(question.linkId, date)}
    />
  );
};
