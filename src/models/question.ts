import store from 'store';

export class NUMQuestionnaireQuestion {
  readonly parent: fhir.Questionnaire | fhir.QuestionnaireItem;
  readonly level: number;

  enableWhen?: fhir.QuestionnaireItemEnableWhen[];

  constructor(
    item: fhir.QuestionnaireItem,
    parent: fhir.Questionnaire | fhir.QuestionnaireItem,
    level: number
  ) {
    Object.assign(this, item);
    this.parent = parent;
    this.level = level;
  }

  get answers() {
    return store.questionnaire.answers;
  }

  get items() {
    return store.questionnaire.flattenedItems;
  }

  get isEnabled() {
    return this.dependencies.every(({ value, questionId }) => {
      const answer = store.questionnaire.answers.get(questionId);
      return answer?.includes(value) || false;
    });
  }

  get dependencies() {
    return (this.enableWhen ?? []).map((condition) => ({
      questionId: condition.question,
      value:
        condition.answerBoolean ??
        condition.answerDecimal ??
        condition.answerInteger ??
        condition.answerDate ??
        condition.answerDateTime ??
        condition.answerTime ??
        condition.answerString ??
        condition.answerCoding?.code ??
        condition.answerQuantity?.code,
    }));
  }

  get config() {
    // TODO
    return {
      min: 0,
      max: Infinity,
    };
  }

  get availableOptions() {
    // TODO
    return [];
  }
}
