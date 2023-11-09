import { h } from '@stencil/core';
import { QuestionnaireQuestionComponentProps } from './types';
import stores from 'stores';

export const MultipleChoiceQuestion = ({
  question,
  answer,
  onChange,
}: QuestionnaireQuestionComponentProps) => {
  return (
    <div class="questionnaire-question__multiple-choice-input">
      {question.availableOptions.filter(Boolean).map((option, index) => {
        // checkbox is disabled if maximum number of allowed choices is reached
        // and answer is not contained in selected choices
        const isDisabled = question.extension.some(
          (e) =>
            e.url.includes('maxOccurs') && e.valueInteger == answer.length && !answer.includes(option.value)
        );
        return (
          <p class={`u-margin-bottom--small u-text-align--left `} key={`${question.linkId}-option${index}`}>
            <d4l-checkbox
              aria-disabled={isDisabled}
              aria-label={(isDisabled && stores.i18n.t('questionnaire.maxAnswersReached')) || undefined}
              checkboxId={`${question.linkId}-option${index}`}
              classes={`o-checkbox--primary ${isDisabled && 'disabled'}`}
              name={question.linkId}
              value={String(option.value)}
              checked={answer.includes(option.value)}
              label={String(option.label)}
              onClick={(event) => {
                if (isDisabled) {
                  event.preventDefault();
                } else {
                  const update = option.value;
                  const newSelection = answer.includes(update)
                    ? answer.filter((value) => value !== update)
                    : [...answer, update];
                  onChange(question.linkId, newSelection);
                }
              }}
            />
          </p>
        );
      })}
    </div>
  );
};
