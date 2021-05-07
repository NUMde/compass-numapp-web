import { h } from '@stencil/core';
import { FHIR_CODE_NO, FHIR_CODE_YES } from 'global/constants';
import { QuestionnaireQuestionComponentProps } from './types';

export const BooleanQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  const checked = answer[0] === FHIR_CODE_YES;

  if (!answer[0]) {
    onChange(question.linkId, FHIR_CODE_NO);
  }

  return (
    <d4l-checkbox
      label={question.text}
      onChange={(event: any) =>
        onChange(question.linkId, event.target.checked ? FHIR_CODE_YES : FHIR_CODE_NO)
      }
      classes="o-checkbox--primary"
      value="1"
      name={question.linkId}
      checkboxId={question.linkId}
      checked={checked}
    />
  );
};
