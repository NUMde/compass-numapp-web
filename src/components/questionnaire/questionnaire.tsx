import { Component, h, Listen, State } from '@stencil/core';
import store from 'store';
import services from 'services';

@Component({
  tag: 'num-container-questionnaire',
})
export class QuestionnaireComponent {
  @State() displayMode: 'index' | 'question' = 'index';
  @Listen('switchDisplayMode')
  onSwitchDisplayMode({ detail }: CustomEvent) {
    const { displayMode } = detail;
    this.displayMode = displayMode;
  }

  async componentWillLoad() {
    try {
      store.questionnaire.populateFromRequestResponse(
        await services.questionnaire.fetch(store.user.questionnaireId)
      );
    } catch (e) {
      services.notifier.onError('questionnaire.error_fetch');
    }
  }

  render() {
    if (!store.questionnaire.isPopulated) {
      return false;
    }

    return this.displayMode === 'index' ? <num-questionnaire-tree /> : <num-questionnaire-question />;
  }
}
