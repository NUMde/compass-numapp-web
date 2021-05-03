import { Component, h, Prop } from '@stencil/core';
import { Card } from 'components/card/card';
import { ROUTES } from 'global/constants';
import { NUMQuestionnaireFlattenedItem, NUMQuestionnaire } from 'services/questionnaire';
import store from 'store';

@Component({
  tag: 'num-questionnaire-tree',
  styleUrl: 'questionnaire-tree.css',
})
export class QuestionnaireTree {
  @Prop() questionnaire: NUMQuestionnaire;
  @Prop() flattenedItems: NUMQuestionnaireFlattenedItem[];

  componentWillLoad() {
    console.log(this.flattenedItems); // TODO remove debug
  }

  render() {
    const { questionnaire, flattenedItems } = this;

    return (
      <Card wide headline={questionnaire.title}>
        <p class="u-infotext">{questionnaire.purpose ?? store.i18n.t('questionnaire.infotext')}</p>
        <ol class="questionnaire-tree">
          {flattenedItems.map(({ linkId, text, type, level }, index) => {
            return (
              <li
                class="questionnaire-tree_item"
                key={linkId ?? index}
                style={{ paddingLeft: `calc(1rem * (${level + 1}))` }}
              >
                <strong class="questionnaire-tree__title">
                  {store.i18n.t(type === 'group' ? 'questionnaire.group' : 'questionnaire.question', {
                    number: linkId,
                  })}
                </strong>
                <span class="questionnaire-tree__text">{text}</span>
              </li>
            );
          })}
        </ol>

        <d4l-button
          classes="button--block u-margin-vertical--normal"
          text={store.i18n.t('questionnaire.continue')}
          handleClick={() => store.auth.logout()}
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
