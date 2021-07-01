import { Component, h } from '@stencil/core';
import stores from 'stores';
import { formatDate } from 'utils/format-date';
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
    } = stores.user;

    if (!isPopulated) {
      return false;
    }

    return (
      <Card
        headline={stores.i18n.t(
          isFirstTimeUser ? 'dashboard.headline.new_user' : 'dashboard.headline.returning_user'
        )}
      >
        <p class="u-infotext">
          {stores.i18n.t(
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
            <d4l-button
              classes="button--block"
              text={stores.i18n.t('dashboard.button.questionnaire')}
              isRouteLink
            />
          </stencil-route-link>
        )}

        <p class="u-infotext">
          {stores.i18n.t(
            isQuestionnaireAvailable
              ? 'dashboard.infotext.questionnaire_available.second_text'
              : 'dashboard.infotext.questionnaire_not_available.second_text'
          )}
        </p>

        {!isQuestionnaireAvailable && (
          <stencil-route-link url={ROUTES.REPORT}>
            <d4l-button
              classes="button--block u-margin-vertical--normal"
              text={stores.i18n.t('dashboard.button.report')}
              isRouteLink
            />
          </stencil-route-link>
        )}

        {FEATURES_SHOW_LOGOUT && (
          <d4l-button
            classes="button--block button--secondary u-margin-top--normal"
            text={stores.i18n.t('dashboard.button.logout')}
            handleClick={() => stores.auth.logout()}
          />
        )}
      </Card>
    );
  }
}
