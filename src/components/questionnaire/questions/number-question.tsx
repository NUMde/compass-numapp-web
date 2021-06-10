import { h } from '@stencil/core';
import { QuestionnaireQuestionComponentProps } from './types';

export const NumberQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  const { minValue, maxValue } = question.config;
  return (
    <d4l-input
      name={question.linkId}
      inputmode={question.type === 'decimal' ? 'decimal' : 'numeric'}
      required={question.required}
      label={question.text}
      hiddenlabel
      onInput={(event: Event) => {
        const value = parseFloat((event.target as HTMLInputElement).value.trim());
        onChange(question.linkId, isNaN(value) ? null : value);
      }}
      value={String(answer[0] ?? '').trim()}
      max={maxValue}
      min={minValue}
      step={question.type === 'integer' ? 1 : 'any'}
      type="number"
    />
  );
};