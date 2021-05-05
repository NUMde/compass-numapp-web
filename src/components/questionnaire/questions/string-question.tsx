import { h } from '@stencil/core';
import { QuestionnaireQuestionComponentProps } from './types';

export const StringQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  return (
    <d4l-input
      name={question.linkId}
      required={question.required}
      placeholder=""
      onInput={(event: Event) => onChange(question.linkId, (event.target as HTMLInputElement).value)}
      value={answer[0] as string}
      type="text"
    />
  );
};
