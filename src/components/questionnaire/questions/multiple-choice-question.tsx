import { h } from '@stencil/core';
import { Fragment } from 'components/fragment/fragment';
import { QuestionnaireQuestionComponentProps } from './types';

export const MultipleChoiceQuestion = ({
  question,
  answer,
  onChange,
}: QuestionnaireQuestionComponentProps) => {
  const value = answer as string[];

  return (
    <Fragment>
      {question.availableOptions.filter(Boolean).map((option, index) => (
        <p class="questionnaire-choice" key={`${question.linkId}-option${index}`}>
          <d4l-checkbox
            checkboxId={`${question.linkId}-option${index}`}
            classes="o-checkbox--primary"
            name={question.linkId}
            value={option.value}
            checked={value.includes(option.value)}
            label={option.label}
            handleChange={(event: Event) => {
              const update = (event.target as HTMLInputElement).value;
              const newSelection = value.includes(update)
                ? value.filter((el) => el !== update)
                : [...value, update];
              onChange(question.linkId, newSelection);
            }}
          />
        </p>
      ))}
    </Fragment>
  );
};
