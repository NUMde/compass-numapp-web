import { h } from '@stencil/core';
import { AutocompleteOption } from '@d4l/web-components-library/dist/types/models/autocomplete-option';

import stores from 'stores';
import { NUMQuestionnaireFlattenedItem } from 'services/questionnaire';
import { QuestionnaireQuestionComponentProps } from './types';

const buildOptions = (question: NUMQuestionnaireFlattenedItem) => {
  const IntlCollator = window.Intl?.Collator;
  const collator = IntlCollator ? new IntlCollator(stores.i18n.language.code) : null;

  return question.availableOptions
    .map((option, index) => {
      return {
        id: `${question.linkId}-option${index}`,
        value: option.value,
        dataAlt: option.label,
        text: option.label,
      } as AutocompleteOption;
    })
    .sort((prev, next) => collator?.compare(prev.text, next.text));
};

export const SingleChoiceDropdownQuestion = ({
  question,
  answer,
  onChange,
}: QuestionnaireQuestionComponentProps) => {
  const options = buildOptions(question);
  const selectedOption = options.find(({ value }) => answer[0] === value);

  return (
    <div class="questionnaire-question__single-choice-dropdown-input">
      <d4l-autocomplete
        inputId={`question${question.linkId}`}
        options={options}
        selectedOption={selectedOption}
        required={question.required}
        onSelectedValueChanged={(event) => {
          onChange(question.linkId, event.detail.value);
          setTimeout(() => (event.target as HTMLElement)?.querySelector('input')?.focus(), 100);
        }}
        statusResultsFound=""
        statusNoResults={stores.i18n.t('questionnaire.dropdown_no_results')}
      />
    </div>
  );
};
