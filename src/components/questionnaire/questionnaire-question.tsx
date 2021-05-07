import { Component, Event, EventEmitter, h, State } from '@stencil/core';
import { Card } from 'components/card/card';
import { NUMQuestionnaireAnswer, NUMQuestionnaireFlattenedItem } from 'services/questionnaire';
import store from 'store';
import {
  BooleanQuestion,
  DateQuestion,
  MultipleChoiceQuestion,
  NumberQuestion,
  SingleChoiceQuestion,
  StringQuestion,
  TextQuestion,
  UnsupportedQuestion,
} from './questions';

@Component({
  tag: 'num-questionnaire-question',
  styleUrl: 'questionnaire-question.css',
})
export class QuestionnaireQuestionComponent {
  @State() question: NUMQuestionnaireFlattenedItem;
  @State() pendingAnswer: NUMQuestionnaireAnswer = [];

  @Event() switchDisplayMode: EventEmitter;
  switchDisplayModeHandler() {
    this.switchDisplayMode.emit({ displayMode: 'index' });
  }

  get storedAnswer() {
    return store.questionnaire.answers.get(this.question?.linkId) ?? [];
  }

  get description() {
    return this.question?.item?.filter((item) => item.type === 'display' && item.text) ?? [];
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
    switch (this.question?.type) {
      case 'boolean':
        return BooleanQuestion;
      case 'decimal':
      case 'integer':
        return NumberQuestion;
      case 'date':
        return DateQuestion;
      case 'string':
        return StringQuestion;
      case 'text':
        return TextQuestion;
      case 'choice':
        return SingleChoiceQuestion;
      case 'open-choice':
        return MultipleChoiceQuestion;
      case 'display':
        return () => false;
      default:
        return UnsupportedQuestion;
    }
  }

  moveToNextQuestion() {
    store.questionnaire.answers.set(this.question.linkId, this.pendingAnswer);
    this.question = this.question.next;
    this.pendingAnswer = [].concat(this.storedAnswer);
  }

  moveToPreviousQuestion() {
    const { previous } = this.question;
    if (!previous) {
      return this.switchDisplayModeHandler();
    }

    this.question = previous;
    this.pendingAnswer = [].concat(this.storedAnswer);
  }

  handleChange = (linkId: string, value: NUMQuestionnaireAnswer) => {
    if (linkId === this.question.linkId) {
      this.pendingAnswer = []
        .concat(value)
        .filter((value) => typeof value === 'number' || typeof value === 'boolean' || !!value);
    }
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.canProceed && this.moveToNextQuestion();
  };

  componentWillLoad() {
    const { questions } = store.questionnaire;
    this.question = questions[0];
    this.pendingAnswer = [].concat(this.storedAnswer);

    console.log(questions); // TODO remove debug
  }

  render() {
    const { question, pendingAnswer, handleChange, handleSubmit, progress, QuestionInput } = this;
    if (!question) {
      return false;
    }

    return (
      <Card wide headline={question.text}>
        {this.description.map((item) => (
          <p class="u-infotext" key={item.linkId}>
            {item.text}
          </p>
        ))}

        <pre
          style={{
            position: 'absolute',
            transform: 'translateX(-100%)',
            marginLeft: '-4rem',
            textAlign: 'left',
          }}
        >
          <strong>DEBUG</strong>
          <br />
          Pending answer: {JSON.stringify(pendingAnswer)}
          <br />
          Stored answer: {JSON.stringify(this.storedAnswer)}
          <br />
          Is enabled: {JSON.stringify(question.isEnabled)}
          <br />
          Index: {question.index}
          <br />
          Progress: {progress}
        </pre>

        <form
          onSubmit={(event) => handleSubmit(event)}
          class="questionnaire-question__form"
          autoComplete="off"
        >
          <QuestionInput question={question} answer={pendingAnswer} onChange={handleChange} />
          <d4l-button
            type="submit"
            class="questionnaire-question__continue"
            classes="button--block u-margin-top--normal"
            text={store.i18n.t('questionnaire.continue')}
            disabled={!this.canProceed}
          />
        </form>

        <d4l-button
          classes="button--block button--secondary u-margin-top--normal"
          text={store.i18n.t('questionnaire.back')}
          handleClick={() => this.moveToPreviousQuestion()}
        />
      </Card>
    );
  }
}
