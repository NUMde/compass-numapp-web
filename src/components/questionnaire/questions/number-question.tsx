import { h } from '@stencil/core';
import { QuestionnaireQuestionComponentProps } from './types';

export const NumberQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  const { minValue, maxValue } = question.config;
  return (
    <d4l-input
      name={question.linkId}
      inputmode="numeric"
      required={question.required}
      label={null}
      onInput={(event: Event) => {
        const value = parseFloat((event.target as HTMLInputElement).value);
        onChange(question.linkId, isNaN(value) ? null : value);
      }}
      value={String(answer[0])}
      max={maxValue}
      min={minValue}
      step={question.type === 'integer' ? 1 : 'any'}
      type="number"
    />
  );
};
