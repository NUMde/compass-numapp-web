import { Component, h, State } from '@stencil/core';
import { Card } from 'components/card/card';
import { ROUTES } from 'global/constants';
import { NUMQuestionnaireFlattenedItem } from 'services/questionnaire';
import store from 'store';

@Component({
  tag: 'num-questionnaire-question',
  styleUrl: 'questionnaire-question.css',
})
export class QuestionnaireQuestionComponent {
  @State() queue: NUMQuestionnaireFlattenedItem[];

  get current() {
    return this.queue[0];
  }

  get description() {
    return this.current?.item?.filter((item) => item.type === 'display' && item.text) ?? [];
  }

  componentWillLoad() {
    const { questions } = store.questionnaire;
    this.queue = [].concat(questions);
    console.log(questions, questions[0].items); // TODO remove debug
  }

  render() {
    if (!this.current) {
      return false;
    }

    return (
      <Card wide headline={this.current?.text}>
        {this.description.map((item) => (
          <p class="u-infotext" key={item.linkId}>
            {item.text}
          </p>
        ))}

        <d4l-button
          classes="button--block u-margin-vertical--normal"
          text={store.i18n.t('questionnaire.continue')}
          handleClick={() => (this.queue = this.queue.slice(1))}
        />

        <stencil-route-link url={ROUTES.DASHBOARD}>
          <d4l-button
            classes="button--block button--secondary u-margin-top--normal"
            text={store.i18n.t('questionnaire.back')}
          />
        </stencil-route-link>
      </Card>
    );
  }
}
