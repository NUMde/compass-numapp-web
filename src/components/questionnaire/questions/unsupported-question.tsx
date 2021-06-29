import { h } from '@stencil/core';
import stores from 'stores';
import { QuestionnaireQuestionComponentProps } from './types';

export const UnsupportedQuestion = ({ question }: QuestionnaireQuestionComponentProps) => {
  const { i18n } = stores;
  return (
    <d4l-notification-bar
      classes="notification-bar--slim notification-bar--bgcolor-red notification-bar--color-white"
      text={i18n.t('questionnaire.question_type_unsupported', { type: question.type })}
    />
  );
};
