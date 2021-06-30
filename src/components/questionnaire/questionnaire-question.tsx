import { Component, Event, EventEmitter, Fragment, h, Prop, State } from '@stencil/core';
import { injectHistory, RouterHistory } from '@stencil/router';
import { Card } from 'components/card/card';
import { FEATURES_QUESTIONNAIRE_SHOW_LINKIDS, FEATURES_QUESTIONNAIRE_SHOW_TREE, ROUTES } from 'config';
import { NUMQuestionnaireAnswer, NUMQuestionnaireFlattenedItem } from 'services/questionnaire';
import { isValidValue } from 'utils/questionnaire';
import stores from 'stores';
import {
  BooleanQuestion,
  DateQuestion,
  MultipleChoiceQuestion,
  NumberQuestion,
  NumberSliderQuestion,
  SingleChoiceDropdownQuestion,
  SingleChoiceQuestion,
  StringQuestion,
  UnsupportedQuestion,
} from './questions';

@Component({
  tag: 'num-questionnaire-question',
  styleUrl: 'questionnaire-question.css',
})
export class QuestionnaireQuestionComponent {
  #formRef?: HTMLFormElement;
  #focusFirstInputTimeout?: number;

  @Prop() linkId?: string;
  @Prop() history: RouterHistory;

  @State() question: NUMQuestionnaireFlattenedItem;
  @State() pendingAnswer: NUMQuestionnaireAnswer = [];

  @Event() switchDisplayMode: EventEmitter;
  switchDisplayModeHandler(displayMode: 'index' | 'confirm') {
    if (!FEATURES_QUESTIONNAIRE_SHOW_TREE && displayMode === 'index') {
      this.history.push(ROUTES.DASHBOARD, {});
    } else {
      this.switchDisplayMode.emit({ displayMode });
    }
  }

  get storedAnswer() {
    return this.question?.answer;
  }

  get titleItem() {
    const { question } = this;
    const parent = question?.parent as fhir4.QuestionnaireItem;
    return parent.type === 'group' ? parent : question;
  }

  get descriptionItem() {
    return this.titleItem !== this.question ? this.question : null;
  }

  get canProceed() {
    return (
      !this.question?.required ||
      this.question?.type === 'display' ||
      this.pendingAnswer.filter((value) => typeof value === 'number' || typeof value === 'boolean' || !!value)
        .length
    );
  }

  get progress() {
    return this.question?.progress ?? 100;
  }

  get QuestionInput() {
    const { question } = this;

    switch (question?.type) {
      case 'boolean':
        return BooleanQuestion;
      case 'decimal':
      case 'integer':
        return question.isSliderQuestion ? NumberSliderQuestion : NumberQuestion;
      case 'date':
        return DateQuestion;
      case 'string':
      case 'text':
        return StringQuestion;
      case 'choice':
        return question.repeats
          ? MultipleChoiceQuestion
          : question.isDropdownQuestion
          ? SingleChoiceDropdownQuestion
          : SingleChoiceQuestion;
      case 'display':
        return () => false;
      default:
        return UnsupportedQuestion;
    }
  }

  moveToNextQuestion() {
    stores.questionnaire.answers.set(this.question.linkId, this.pendingAnswer);

    if (!this.question.next) {
      this.switchDisplayModeHandler('confirm');
      return;
    }

    this.question = this.question.next;
    this.pendingAnswer = [].concat(this.storedAnswer ?? []);

    requestAnimationFrame(() => this.focusFirstInput());
  }

  moveToPreviousQuestion() {
    const { previous } = this.question;
    if (!previous) {
      return this.switchDisplayModeHandler('index');
    }

    this.question = previous;
    this.pendingAnswer = [].concat(this.storedAnswer ?? []);
    requestAnimationFrame(() => this.focusFirstInput());
  }

  handleChange = (linkId: string, value: NUMQuestionnaireAnswer) => {
    if (linkId === this.question.linkId) {
      this.pendingAnswer = [].concat(value).filter(isValidValue);
    }
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.canProceed && this.moveToNextQuestion();
  };

  focusFirstInput() {
    clearTimeout(this.#focusFirstInputTimeout);
    const inputEl = this.#formRef?.querySelector('input');
    if (!inputEl) {
      this.#focusFirstInputTimeout = window.setTimeout(() => this.focusFirstInput(), 100);
      return;
    }

    this.#formRef?.querySelector('input')?.focus();
  }

  componentWillLoad() {
    const { questions } = stores.questionnaire;
    const selectedQuestion = questions.find(({ linkId }) => linkId === this.linkId);
    this.question = selectedQuestion?.isAnswerable
      ? selectedQuestion
      : []
          .concat(questions)
          .reverse()
          .find(({ isAnswerable }) => isAnswerable);
    this.pendingAnswer = [].concat(this.storedAnswer ?? []);
  }

  componentDidLoad() {
    this.focusFirstInput();
  }

  disconnectedCallback() {
    clearTimeout(this.#focusFirstInputTimeout);
  }

  render() {
    const {
      question,
      pendingAnswer,
      titleItem,
      descriptionItem,
      handleChange,
      handleSubmit,
      progress,
      QuestionInput,
    } = this;

    if (!question) {
      return false;
    }

    return (
      <Card
        headline={`${FEATURES_QUESTIONNAIRE_SHOW_LINKIDS ? `${titleItem.linkId} – ` : ''}${titleItem.text}`}
      >
        <d4l-linear-progress classes="questionnaire-question__progress" value={progress} />

        <form
          ref={(el) => (this.#formRef = el)}
          onSubmit={(event) => handleSubmit(event)}
          class="questionnaire-question__form"
          autoComplete="off"
        >
          {descriptionItem && (
            <p class="questionnaire-question__description">
              {FEATURES_QUESTIONNAIRE_SHOW_LINKIDS && (
                <Fragment>
                  <strong>{descriptionItem.linkId}</strong>&#160;
                </Fragment>
              )}
              {descriptionItem.text}
            </p>
          )}

          <QuestionInput question={question} answer={pendingAnswer} onChange={handleChange} />
          <d4l-button
            type="submit"
            class="questionnaire-question__continue"
            classes="button--block u-margin-top--normal"
            text={stores.i18n.t('questionnaire.continue')}
            disabled={!this.canProceed}
          />
        </form>

        <d4l-button
          classes="button--block button--secondary u-margin-top--normal"
          text={stores.i18n.t('questionnaire.back')}
          handleClick={() => this.moveToPreviousQuestion()}
        />
      </Card>
    );
  }
}

injectHistory(QuestionnaireQuestionComponent);
