import { Component, h, Listen, State } from '@stencil/core';
import stores from 'stores';
import services from 'services';
import { FEATURES_QUESTIONNAIRE_SHOW_TREE, ROUTES } from 'config';

@Component({
  tag: 'num-container-questionnaire',
})
export class QuestionnaireComponent {
  @State() displayMode: 'index' | 'question' | 'confirm' | 'success' = FEATURES_QUESTIONNAIRE_SHOW_TREE
    ? 'index'
    : 'question';
  @State() linkId?: string;
  @Listen('switchDisplayMode')
  onSwitchDisplayMode({ detail }: CustomEvent) {
    const { displayMode, linkId } = detail;
    this.linkId = linkId;
    this.displayMode = displayMode;
  }

  async componentWillLoad() {
    try {
      stores.user.isQuestionnaireAvailable &&
        stores.questionnaire.populateFromRequestResponse(
          await services.questionnaire.fetch(stores.user.questionnaireId)
        );
    } catch (_) {
      services.notifier.showError('questionnaire.fetch_failed');
    }
  }

  render() {
    if (!stores.user.isQuestionnaireAvailable && this.displayMode !== 'success') {
      return <stencil-router-redirect url={ROUTES.DASHBOARD} />;
    }

    if (!stores.questionnaire.isPopulated) {
      return (
        <d4l-button
          classes="button--secondary"
          text={stores.i18n.t('questionnaire.fetch_retry')}
          handleClick={() => {
            stores.notifications.dismissCurrent();
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
