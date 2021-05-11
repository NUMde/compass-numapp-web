import { parseExtensions } from 'services/utils/questionnaire';
import store from 'store';

export class NUMQuestionnaireQuestion {
  readonly parent: fhir.Questionnaire | fhir.QuestionnaireItem;
  readonly level: number;

  linkId: string;
  type: fhir.QuestionnaireItemType;

  answerOption?: fhir.QuestionnaireResponseItemAnswer[];
  enableBehavior?: 'all' | 'any';
  enableWhen?: fhir.QuestionnaireItemEnableWhen[];
  extension?: fhir.Extension[];
  item?: fhir.QuestionnaireItem[];
  maxLength?: number;

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
    return store.questionnaire.questions;
  }

  getItem(linkId: string) {
    return this.items.find((item) => item.linkId === linkId);
  }

  get isEnabled() {
    const fn = this.enableBehavior === 'any' ? 'some' : 'every';
    return this.dependencies[fn](({ value, questionId }) => {
      const answer = store.questionnaire.answers.get(questionId);
      return (this.getItem(questionId)?.isEnabled && answer?.includes(value)) || false;
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

  get index() {
    return this.items.indexOf(this);
  }

  get next() {
    return this.items
      .slice(this.index + 1)
      .reduce((next, item) => next ?? (item.isEnabled ? item : null), null);
  }

  get previous() {
    return this.items
      .slice(0, this.index)
      .reverse()
      .reduce((previous, item) => previous ?? (item.isEnabled ? item : null), null);
  }

  get progress() {
    return Math.round((this.index / this.items.length) * 100);
  }

  get config() {
    const { minValue, maxValue, minLength, 'questionnaire-itemControl': itemControl } = parseExtensions(
      this.extension ?? []
    );

    return {
      minValue,
      maxValue,
      minLength,
      maxLength: this.maxLength,
      itemControl,
    };
  }

  get availableOptions() {
    return this.answerOption
      ?.map(
        (option) =>
          option.valueBoolean ??
          option.valueDecimal ??
          option.valueInteger ??
          option.valueDate ??
          option.valueDateTime ??
          option.valueTime ??
          option.valueString ??
          option.valueCoding?.code ??
          option.valueQuantity?.code
      )
      .map((value) => ({ value, label: value }));
  }
}
