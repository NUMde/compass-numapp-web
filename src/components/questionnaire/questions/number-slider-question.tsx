import { h } from '@stencil/core';
import { QuestionnaireQuestionComponentProps } from './types';

export const NumberSliderQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  const { minValue, maxValue, sliderStepValue = 1 } = question.config;
  const value = parseFloat(answer[0] as string);

  return (
    <d4l-slider-input
      class="questionnaire-question__number-slider-input"
      min={minValue}
      max={maxValue}
      value={isNaN(value) ? null : value}
      step={sliderStepValue}
      scale
      handleChange={({ target }) => onChange(question.linkId, target.value)}
    />
  );
};
