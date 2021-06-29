import { h } from '@stencil/core';
import stores from 'stores';
import { QuestionnaireQuestionComponentProps } from './types';

const MAX_SAFE_NUMBER_LENGTH = 15;

/**
 * Due to many bugs and inconsistencies across different browsers and
 * javascript bugs, especially when dealing with large numbers, floats
 * and scientific notations, as well as unintended side effects when using
 * type=number inputs, this is now the custom implementation for parsing
 * and reformatting the input value.
 *
 * Known remaining issue: some mobile numeric/decimal input software keyboards
 * do not allow entering the "-" character, thus it is in that case impossible
 * to enter negative values.
 */
const formatAndParseInput = (
  question: QuestionnaireQuestionComponentProps['question'],
  rawValue: string
): [string, number] => {
  const { minValue, maxValue } = question.config;

  const localSeparator = window.Intl?.NumberFormat?.(stores.i18n.language.locale)
    .format(0.1)
    .replace(/\d/g, '');
  const allowedSeparators =
    question.type === 'decimal'
      ? ['.', ',', localSeparator]
          .filter(Boolean)
          .filter((separator, index, separators) => separators.indexOf(separator) === index)
      : [];

  const sanitizedParts = rawValue
    .replace(new RegExp(`[^-\\d${allowedSeparators.join('')}]`, 'g'), '')
    .replace(/(.+)[-]/g, '$1')
    .slice(0, MAX_SAFE_NUMBER_LENGTH)
    .split(/[^-\d]/g);
  const sanitizedRawValue = [sanitizedParts.pop(), sanitizedParts.join('')]
    .reverse()
    .filter(Boolean)
    .join('.');

  const formattedValue =
    sanitizedRawValue.replace('.', localSeparator ?? '.').replace(/^0+(\d)/g, '$1') +
    (allowedSeparators.includes(rawValue.slice(-1)) ? localSeparator : '');
  const parsedValue =
    question.type === 'decimal' ? parseFloat(sanitizedRawValue) : parseInt(sanitizedRawValue, 10);
  const value = Math.max(Math.min(parsedValue, maxValue ?? Infinity), minValue ?? -Infinity);

  return [
    isNaN(value) || parsedValue === value
      ? formattedValue
      : window.Intl?.NumberFormat?.(stores.i18n.language.locale).format(value) ?? String(value),
    value,
  ];
};

export const NumberQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  return (
    <d4l-input
      name={question.linkId}
      inputmode={question.type === 'decimal' ? 'decimal' : 'numeric'}
      required={question.required}
      label={question.text}
      hiddenlabel
      onInput={(event: Event) => {
        const el = event.target as HTMLInputElement;
        const [formattedValue, value] = formatAndParseInput(question, el.value.trim());
        el.value !== formattedValue && (el.value = formattedValue);
        onChange(question.linkId, isNaN(value) ? null : value);
      }}
      value={formatAndParseInput(question, String(answer[0] ?? '').trim())[0]}
      type="text"
      maxlength={MAX_SAFE_NUMBER_LENGTH}
    />
  );
};
