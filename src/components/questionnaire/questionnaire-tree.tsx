import { Component, h, Prop } from '@stencil/core';
import { Card } from 'components/card/card';
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
      <Card headline={questionnaire.title}>
        <p class="u-infotext">{questionnaire.purpose ?? store.i18n.t('questionnaire.infotext')}</p>
        <ol class="questionnaire-tree">
          {flattenedItems.map(({ linkId, text, type }, index) => {
            return (
              <li class="questionnaire-tree_item" key={linkId ?? index}>
                {store.i18n.t(type === 'group' ? 'questionnaire.group' : 'questionnaire.question', {
                  number: linkId,
                })}
                : {text}
              </li>
            );
          })}
        </ol>
      </Card>
    );
  }
}
