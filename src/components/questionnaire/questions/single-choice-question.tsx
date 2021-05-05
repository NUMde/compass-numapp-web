import { h } from '@stencil/core';
import { Fragment } from 'components/fragment/fragment';
import { QuestionnaireQuestionComponentProps } from './types';

export const SingleChoiceQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  return (
    <Fragment>
      {question.availableOptions.filter(Boolean).map((option, index) => (
        <p class="input-radio__choice" key={`${question.linkId}-option${index}`}>
          <d4l-radio
            radio-id={`${question.linkId}-option${index}`}
            classes="o-radio--primary"
            name={question.linkId}
            value={option.value}
            checked={answer[0] === option.value}
            required={question.required}
            label={option.label}
            handleChange={(event: Event) =>
              onChange(question.linkId, (event.target as HTMLInputElement).value)
            }
          />
        </p>
      ))}
    </Fragment>
  );
};
