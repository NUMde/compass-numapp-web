import { Component, h } from '@stencil/core';
import services from 'services';
import store from 'store';
import { formatDate } from 'services/utils/format-date';
import { ROUTES, SHOW_LOGOUT } from 'global/constants';
import { Card } from 'components/card/card';

@Component({
  tag: 'num-container-dashboard',
})
export class Dashboard {
  async componentWillLoad() {
    if (store.user.isPopulated) {
      return;
    }

    try {
      const userId = store.auth.accessToken;
      const userResponse = await services.user.fetch(userId);
      if (userResponse.study_id !== userId) {
        throw new Error();
      }

      store.user.populateFromUserResponse(userResponse);
    } catch (e) {
      store.auth.expireSession();
    }
  }

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

        <strong class="u-display-block u-margin-vertical--normal">
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

        <stencil-route-link url={ROUTES.REPORT}>
          <d4l-button
            classes={`button--block u-margin-vertical--normal ${
              isQuestionnaireAvailable ? 'button--secondary' : ''
            }`}
            text={store.i18n.t('dashboard.button.report')}
          />
        </stencil-route-link>

        {SHOW_LOGOUT && (
          <d4l-button
            classes="button--block button--secondary"
            text={store.i18n.t('dashboard.button.logout')}
            handleClick={() => store.auth.logout()}
          />
        )}
      </Card>
    );
  }
}