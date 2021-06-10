import { h } from '@stencil/core';
import { Fragment } from 'components/fragment/fragment';
import { QuestionnaireQuestionComponentProps } from './types';

export const MultipleChoiceQuestion = ({
  question,
  answer,
  onChange,
}: QuestionnaireQuestionComponentProps) => {
  return (
    <Fragment>
      {question.availableOptions.filter(Boolean).map((option, index) => (
        <p class="u-margin-bottom--small" key={`${question.linkId}-option${index}`}>
          <d4l-checkbox
            checkboxId={`${question.linkId}-option${index}`}
            classes="o-checkbox--primary"
            name={question.linkId}
            value={String(option.value)}
            checked={answer.includes(option.value)}
            label={String(option.label)}
            handleChange={() => {
              const update = option.value;
              const newSelection = answer.includes(update)
                ? answer.filter((value) => value !== update)
                : [...answer, update];
              onChange(question.linkId, newSelection);
            }}
          />
        </p>
      ))}
    </Fragment>
  );
};