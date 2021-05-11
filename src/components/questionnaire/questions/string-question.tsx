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
      onInput={(event: Event) => onChange(question.linkId, (event.target as HTMLInputElement).value)}
      value={answer[0] as string}
      minlength={minLength}
      maxlength={maxLength}
      type="text"
    />
  );
};
