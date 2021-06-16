import { Component, h } from '@stencil/core';
import store from 'store';
import { formatDate } from 'services/utils/format-date';
import { ROUTES, FEATURES_SHOW_LOGOUT } from 'config';
import { Card } from 'components/card/card';

@Component({
  tag: 'num-container-dashboard',
})
export class Dashboard {
  render() {
    const {
      isPopulated,
      isFirstTimeUser,
      isQuestionnaireAvailable,
      questionnaireStartDate,
      questionnaireDueDate,
    } = store.user;

    if (!isPopulated) {
      return false;
    }

    return (
      <Card
        headline={store.i18n.t(
          isFirstTimeUser ? 'dashboard.headline.new_user' : 'dashboard.headline.returning_user'
        )}
      >
        <p class="u-infotext">
          {store.i18n.t(
            isQuestionnaireAvailable
              ? 'dashboard.infotext.questionnaire_available.first_text'
              : 'dashboard.infotext.questionnaire_not_available.first_text'
          )}
        </p>

        <strong class="u-display-block u-margin-vertical--normal u-text-highlight">
          {formatDate(isQuestionnaireAvailable ? questionnaireDueDate : questionnaireStartDate)}
        </strong>

        {isQuestionnaireAvailable && (
          <stencil-route-link url={ROUTES.QUESTIONNAIRE}>
            <d4l-button classes="button--block" text={store.i18n.t('dashboard.button.questionnaire')} />
          </stencil-route-link>
        )}

        <p class="u-infotext">
          {store.i18n.t(
            isQuestionnaireAvailable
              ? 'dashboard.infotext.questionnaire_available.second_text'
              : 'dashboard.infotext.questionnaire_not_available.second_text'
          )}
        </p>

        {!isQuestionnaireAvailable && (
          <stencil-route-link url={ROUTES.REPORT}>
            <d4l-button
              classes="button--block u-margin-vertical--normal"
              text={store.i18n.t('dashboard.button.report')}
            />
          </stencil-route-link>
        )}

        {FEATURES_SHOW_LOGOUT && (
          <d4l-button
            classes="button--block button--secondary u-margin-top--normal"
            text={store.i18n.t('dashboard.button.logout')}
            handleClick={() => store.auth.logout()}
          />
        )}
      </Card>
    );
  }
}
