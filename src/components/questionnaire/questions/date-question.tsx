import { h } from '@stencil/core';
import store from 'store';
import { QuestionnaireQuestionComponentProps } from './types';

const getTimelessDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const DateQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  const { i18n } = store;

  const value = answer[0] as string;
  let year: string, month: string, day: string;
  const delimiter: string = value && value.includes('.') ? '.' : '-';
  [year, month, day] = value ? value.split(delimiter) : [null, null, null];

  const minDate = question.config?.min ? getTimelessDate(new Date(question.config.min)) : null;
  const maxDate = question.config?.max ? getTimelessDate(new Date(question.config.max)) : null;

  return (
    <d4l-date-input
      label={i18n.t('input.date.label')}
      errorMessage={i18n.t('input.date.error.text')}
      fields={{
        day: {
          label: `${i18n.t('input.date.day.label')}`,
          placeholder: `${i18n.t('input.date.day.placeholder')}`,
          value: day,
        },
        month: {
          label: `${i18n.t('input.date.month.label')}`,
          placeholder: `${i18n.t('input.date.month.placeholder')}`,
          value: month,
        },
        year: {
          label: `${i18n.t('input.date.year.label')}`,
          placeholder: `${i18n.t('input.date.year.placeholder')}`,
          value: year,
        },
      }}
      futureAllowed={!!maxDate}
      min={minDate}
      max={maxDate}
      handleChange={(date: string) => onChange(question.linkId, date)}
    />
  );
};
