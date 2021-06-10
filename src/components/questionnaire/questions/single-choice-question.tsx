import { h } from '@stencil/core';
import { Fragment } from 'components/fragment/fragment';
import { QuestionnaireQuestionComponentProps } from './types';

export const SingleChoiceQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  return (
    <Fragment>
      {question.availableOptions.filter(Boolean).map((option, index) => (
        <p class="u-margin-bottom--small" key={`${question.linkId}-option${index}`}>
          <d4l-radio
            radio-id={`${question.linkId}-option${index}`}
            classes="o-radio--primary"
            name={question.linkId}
            value={String(option.value)}
            checked={answer[0] === option.value}
            required={question.required}
            label={String(option.label)}
            handleChange={() => onChange(question.linkId, option.value)}
          />
        </p>
      ))}
    </Fragment>
  );
};
