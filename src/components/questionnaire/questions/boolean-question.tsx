import { h } from '@stencil/core';
import { QuestionnaireQuestionComponentProps } from './types';

export const BooleanQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  if (!answer[0]) {
    onChange(question.linkId, false);
  }

  return (
    <d4l-checkbox
      class="questionnaire-question__boolean-input"
      label={question.text}
      onChange={(event: any) => onChange(question.linkId, event.target.checked)}
      classes="o-checkbox--primary"
      value="1"
      name={question.linkId}
      checkboxId={question.linkId}
      checked={!!answer[0]}
    />
  );
};
