import { h } from '@stencil/core';
import { QuestionnaireQuestionComponentProps } from './types';

export const TextQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  return (
    <d4l-textarea
      textarea-id="questionnaire_textarea"
      name={question.linkId}
      label={question.text}
      onChange={(event: any) => onChange(question.linkId, event.target.value.trim())}
      value={String(answer[0] ?? '').trim()}
      required={question.required}
      maxlength={String(question.config.maxLength ?? '')}
    />
  );
};
