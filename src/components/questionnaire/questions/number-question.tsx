import { h } from '@stencil/core';
import { QuestionnaireQuestionComponentProps } from './types';

export const NumberQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  const max =
    typeof question.config?.max === 'string' ? parseInt(question.config?.max) : question.config?.max;
  const min =
    typeof question.config?.min === 'string' ? parseInt(question.config?.min) : question.config?.min;

  return (
    <d4l-input
      name={question.linkId}
      inputmode="numeric"
      required={question.required}
      placeholder=""
      onInput={(event: Event) => onChange(question.linkId, (event.target as HTMLInputElement).value)}
      value={answer[0] as string}
      max={max}
      min={min}
      type="number"
    />
  );
};
