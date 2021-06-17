import { Component, Event, EventEmitter, h } from '@stencil/core';
import { Card } from 'components/card/card';
import { FEATURES_QUESTIONNAIRE_SHOW_LINKIDS, ROUTES } from 'config';
import store from 'store';

@Component({
  tag: 'num-questionnaire-tree',
  styleUrl: 'questionnaire-tree.css',
})
export class QuestionnaireTreeComponent {
  @Event() switchDisplayMode: EventEmitter;
  switchDisplayModeHandler(linkId?: string) {
    if (store.questionnaire.isCompleted && !linkId) {
      this.switchDisplayMode.emit({ displayMode: 'confirm' });
    } else {
      this.switchDisplayMode.emit({ displayMode: 'question', linkId });
    }
  }

  render() {
    const { questionnaire, flattenedItems } = store.questionnaire;

    return (
      <Card wide headline={questionnaire.title}>
        <p class="u-infotext">{questionnaire.purpose ?? store.i18n.t('questionnaire.infotext')}</p>
        <ol class="questionnaire-tree">
          {flattenedItems.map(({ linkId, text, type, level, isAnswerable, firstChildQuestion }, index) => {
            return (
              <li
                class={`questionnaire-tree_item ${isAnswerable ? 'questionnaire-tree_item--clickable' : ''}`}
                key={linkId ?? index}
                style={{ paddingLeft: `calc(1rem * (${level + 1}))` }}
                onClick={() =>
                  isAnswerable &&
                  this.switchDisplayModeHandler(firstChildQuestion ? firstChildQuestion.linkId : linkId)
                }
              >
                <strong class="questionnaire-tree__title">
                  {FEATURES_QUESTIONNAIRE_SHOW_LINKIDS &&
                    store.i18n.t(type === 'group' ? 'questionnaire.group' : 'questionnaire.question', {
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
          handleClick={() => this.switchDisplayModeHandler()}
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
