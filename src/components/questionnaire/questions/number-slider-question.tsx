import { h } from '@stencil/core';
import { QuestionnaireQuestionComponentProps } from './types';

export const NumberSliderQuestion = ({ question, answer, onChange }: QuestionnaireQuestionComponentProps) => {
  const { minValue, maxValue, sliderMinLabel, sliderMaxLabel, sliderStepValue = 1 } = question.config;
  const value = parseFloat(answer[0] as string);

  return (
    <d4l-slider-input
      class="questionnaire-question__number-slider-input"
      min={minValue}
      max={maxValue}
      minLabel={sliderMinLabel}
      maxLabel={sliderMaxLabel}
      value={isNaN(value) ? null : value}
      step={sliderStepValue}
      scale={!sliderMinLabel && !sliderMaxLabel}
      handleChange={({ target }) => onChange(question.linkId, target.value)}
    />
  );
};
