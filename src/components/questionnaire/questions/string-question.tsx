import { h } from '@stencil/core';
import { QuestionnaireQuestionComponentProps } from './types';

export const StringQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  const { minLength, maxLength } = question.config;
  return (
    <d4l-input
      name={question.linkId}
      required={question.required}
      label={question.text}
      hiddenlabel
      onInput={(event: Event) => onChange(question.linkId, (event.target as HTMLInputElement).value.trim())}
      value={String(answer[0] ?? '').trim()}
      minlength={minLength}
      maxlength={maxLength}
      type="text"
    />
  );
};
