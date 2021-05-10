import { h } from '@stencil/core';
import { QuestionnaireQuestionComponentProps } from './types';

export const TextQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  return (
    <d4l-textarea
      textarea-id="questionnaire_textarea"
      name={question.linkId}
      onChange={(event: any) => onChange(question.linkId, event.target.value)}
      value={answer[0] as string}
      required={question.required}
      maxlength={String(question.config.maxLength ?? '')}
    />
  );
};
