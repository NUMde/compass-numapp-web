import { Component, Event, EventEmitter, h, State } from '@stencil/core';
import stores from 'stores';
import { Card } from 'components/card/card';
import services from 'services';

@Component({
  tag: 'num-questionnaire-confirm',
})
export class QuestionnaireConfirmComponent {
  @State() isBusy = false;
  @Event() switchDisplayMode: EventEmitter;
  switchDisplayModeHandler(displayMode: 'index' | 'question' | 'success') {
    this.switchDisplayMode.emit({ displayMode });
  }

  async submitQuestionnaire() {
    this.isBusy = true;

    try {
      await services.questionnaire.submitQuestionnaireResponse();
      await services.user.refresh();
      this.switchDisplayModeHandler('success');
      stores.questionnaire.answers.reset();
    } catch (error) {
      this.isBusy = false;
      console.error(error);
      services.notifier.showError('questionnaire.confirm_submit.error');
    }
  }

  componentWillLoad() {
    !stores.questionnaire.isCompleted && this.switchDisplayModeHandler('index');
  }

  render() {
    if (!stores.questionnaire.isCompleted) {
      return false;
    }

    return (
      <Card headline={stores.i18n.t('questionnaire.confirm_submit.headline')}>
        <p class="u-infotext">{stores.i18n.t('questionnaire.confirm_submit.infotext')}</p>
        <d4l-button
          classes="button--block u-margin-top--large"
          text={stores.i18n.t('questionnaire.continue')}
          isLoading={this.isBusy}
          handleClick={() => this.submitQuestionnaire()}
        />
        <d4l-button
          classes="button--block button--secondary u-margin-top--normal"
          text={stores.i18n.t('questionnaire.back')}
          handleClick={() => this.switchDisplayModeHandler('question')}
        />
      </Card>
    );
  }
}
