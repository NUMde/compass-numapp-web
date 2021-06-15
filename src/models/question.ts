import { extractLabel, extractValue, parseExtensions } from 'services/utils/questionnaire';
import store from 'store';

export class NUMQuestionnaireQuestion {
  readonly parent: fhir4.Questionnaire | fhir4.QuestionnaireItem;
  readonly level: number;

  linkId: string;
  type: fhir4.QuestionnaireItem['type'];

  answerOption?: fhir4.QuestionnaireItemAnswerOption[];
  enableBehavior?: 'all' | 'any';
  enableWhen?: fhir4.QuestionnaireItemEnableWhen[];
  extension?: fhir4.Extension[];
  item?: fhir4.QuestionnaireItem[];
  maxLength?: number;
  required?: boolean;

  constructor(
    item: fhir4.QuestionnaireItem,
    parent: fhir4.Questionnaire | fhir4.QuestionnaireItem,
    level: number
  ) {
    Object.assign(this, item);
    this.parent = parent;
    this.level = level;
  }

  get items() {
    return store.questionnaire.flattenedItems;
  }

  get answers() {
    return store.questionnaire.answers;
  }

  get answer() {
    return this.answers.get(this.linkId);
  }

  get questions() {
    return store.questionnaire.questions;
  }

  get children() {
    return this.item?.map(({ linkId }) => this.items.find((item) => item.linkId === linkId)) ?? [];
  }

  getItem(linkId: string) {
    return this.questions.find((item) => item.linkId === linkId);
  }

  get isEnabled() {
    const fn = this.enableBehavior === 'any' ? 'some' : 'every';
    return this.dependencies[fn](({ value, questionId }) => {
      const answer = this.answers.get(questionId);
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
    return this.questions.indexOf(this);
  }

  get next() {
    return this.questions
      .slice(this.index + 1)
      .reduce((next, item) => next ?? (item.isEnabled ? item : null), null);
  }

  get previous() {
    return this.questions
      .slice(0, this.index)
      .reverse()
      .reduce((previous, item) => previous ?? (item.isEnabled ? item : null), null);
  }

  get progress() {
    return Math.round((this.index / this.questions.length) * 100);
  }

  get config() {
    const {
      minValue,
      maxValue,
      minLength,
      'questionnaire-itemControl': itemControl,
      'questionnaire-sliderStepValue': sliderStepValue,
    } = parseExtensions(this.extension ?? []);

    return {
      minValue,
      maxValue,
      minLength,
      maxLength: this.maxLength,
      sliderStepValue,
      // itemControl, // TODO re-enable
      itemControl:
        // @ts-ignore
        this.extension?.find(({ url }) => url.includes('itemControl'))?.valueCodeableConcept?.CodeableConcept
          ?.coding?.[0]?.code ?? itemControl, // TODO remove this workaround once example questionnaire is fixed
    };
  }

  get availableOptions() {
    return this.answerOption?.map((option) => ({
      value: extractValue(option),
      label: String(extractLabel(option)).replace(/^\d+\#\s*/, ''),
    }));
  }

  get isSliderQuestion() {
    const { itemControl, minValue, maxValue } = this.config;
    return itemControl === 'slider' && typeof minValue === 'number' && typeof maxValue === 'number';
  }

  get isAnswered() {
    if (this.type === 'group') {
      return this.firstChildQuestion?.isAnswered || false;
    }

    const { previous } = this;
    return (
      (!previous || previous.isAnswered) &&
      (!!this.answer || !this.required || !this.isEnabled || this.type === 'display')
    );
  }

  get isAnswerable() {
    if (this.type === 'group') {
      return this.firstChildQuestion?.isAnswerable || false;
    }

    return this.isEnabled && (this.isAnswered || this.previous?.isAnswered || !this.previous);
  }

  get firstChildQuestion() {
    if (this.type !== 'group') {
      return undefined;
    }

    const firstChild = this.children[0];
    return firstChild?.firstChildQuestion ?? firstChild;
  }
}
