import { NUMQuestionnaireQuestion } from 'models/question';
import { NumQuestionnaireExtensionConfig, NUMQuestionnaireFlattenedItem } from 'services/questionnaire';

export const flattenNestedItems = (
  items: fhir.QuestionnaireItem[],
  parent: fhir.Questionnaire | fhir.QuestionnaireItem,
  level = 0
): NUMQuestionnaireFlattenedItem[] => {
  return items
    .map((item) => new NUMQuestionnaireQuestion(item, parent, level))
    .reduce(
      (questions, item) =>
        questions.concat(item).concat(item.item ? flattenNestedItems(item.item, item, level + 1) : []),
      []
    );
};

export const extractQuestions = (
  flattenedItems: NUMQuestionnaireFlattenedItem[]
): NUMQuestionnaireFlattenedItem[] => {
  return flattenedItems.filter(({ type }) => type !== 'group');
};

export const extractValue = (item: fhir.Extension | fhir.QuestionnaireResponseItemAnswer) => {
  return (
    item.valueBoolean ??
    item.valueDecimal ??
    item.valueInteger ??
    item.valueDate ??
    item.valueDateTime ??
    (item as fhir.Extension).valueInstant ??
    item.valueTime ??
    item.valueString ??
    item.valueCoding?.code ??
    item.valueQuantity?.code
  );
};

export const parseExtensions = (extensions: fhir.Extension[]): NumQuestionnaireExtensionConfig => {
  return extensions.reduce(
    (config, extension) =>
      Object.assign(config, {
        [extension.url.replace('http://hl7.org/fhir/StructureDefinition/', '')]: extractValue(extension),
      }),
    {}
  );
};

export const getHash = (data: string) => {
  return (
    data.split('').reduce((hash, character: any) => {
      hash ^= character;
      return hash + (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }, 0x811c9dc5) >>> 0
  ).toString(16);
};
