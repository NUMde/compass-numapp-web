import { NUMQuestionnaireAnswer, NUMQuestionnaireFlattenedItem } from 'services/questionnaire';

export type QuestionnaireQuestionComponentProps = {
  question: NUMQuestionnaireFlattenedItem;
  answer: NUMQuestionnaireAnswer;
  onChange: Function;
};
