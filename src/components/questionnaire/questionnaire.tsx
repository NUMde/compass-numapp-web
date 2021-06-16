import { Component, h, Listen, State } from '@stencil/core';
import store from 'store';
import services from 'services';
import { ROUTES } from 'config';

@Component({
  tag: 'num-container-questionnaire',
})
export class QuestionnaireComponent {
  @State() displayMode: 'index' | 'question' | 'confirm' | 'success' = 'index';
  @State() linkId?: string;
  @Listen('switchDisplayMode')
  onSwitchDisplayMode({ detail }: CustomEvent) {
    const { displayMode, linkId } = detail;
    this.linkId = linkId;
    this.displayMode = displayMode;
  }

  async componentWillLoad() {
    try {
      store.questionnaire.populateFromRequestResponse(
        await services.questionnaire.fetch(store.user.questionnaireId)
      );
    } catch (e) {
      services.notifier.onError('questionnaire.fetch_failed');
    }
  }

  render() {
    if (!store.questionnaire.isPopulated) {
      return (
        <d4l-button
          classes="button--secondary"
          text={store.i18n.t('questionnaire.fetch_retry')}
          handleClick={() => {
            store.notifications.dismissCurrent();
            this.componentWillLoad();
          }}
        />
      );
    }

    switch (this.displayMode) {
      case 'index':
        return <num-questionnaire-tree />;
      case 'question':
        return <num-questionnaire-question linkId={this.linkId} />;
      case 'confirm':
        return <num-questionnaire-confirm />;
      case 'success':
        return <num-questionnaire-success />;
      default:
        return <stencil-router-redirect url={ROUTES.DASHBOARD} />;
    }
  }
}
