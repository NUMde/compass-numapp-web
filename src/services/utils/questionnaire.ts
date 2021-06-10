import { NUMQuestionnaireQuestion } from 'models/question';
import { NumQuestionnaireExtensionConfig, NUMQuestionnaireFlattenedItem } from 'services/questionnaire';
import forge from 'node-forge';

export const flattenNestedItems = (
  items: fhir4.QuestionnaireItem[],
  parent: fhir4.Questionnaire | fhir4.QuestionnaireItem,
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

export const isValidValue = (value: any) =>
  typeof value === 'number' || typeof value === 'boolean' || !!value;

export const extractValue = (item: fhir4.Extension | fhir4.QuestionnaireResponseItemAnswer) => {
  return (
    item.valueBoolean ??
    item.valueDecimal ??
    item.valueInteger ??
    item.valueDate ??
    item.valueDateTime ??
    (item as fhir4.Extension).valueInstant ??
    item.valueTime ??
    item.valueString ??
    item.valueCoding?.code ??
    item.valueQuantity?.code
  );
};

export const extractLabel = (item: fhir4.Extension | fhir4.QuestionnaireResponseItemAnswer) => {
  return item.valueCoding?.display ?? extractValue(item);
};

const buildFHIRValueFromOption = (
  item: fhir4.QuestionnaireItem,
  value: number | boolean | string
): fhir4.QuestionnaireResponseItemAnswer => {
  const selectedOption = item.answerOption?.find((option) => extractValue(option) === value);
  if (!selectedOption) {
    // open-choice free text answer has been given
    return { valueString: String(value) };
  }

  return { ...selectedOption };
};

export const buildFHIRValue = (
  item: fhir4.QuestionnaireItem,
  value: number | boolean | string
): fhir4.QuestionnaireResponseItemAnswer => {
  switch (item.type) {
    case 'group':
    case 'display':
      return null;
    case 'boolean':
      return { valueBoolean: Boolean(value) };
    case 'decimal':
      return { valueDecimal: Number(value) };
    case 'integer':
      return { valueInteger: Number(value) };
    case 'date':
      return { valueDate: String(value) };
    case 'string':
    case 'text':
    case 'url':
      return { valueString: String(value) };
    case 'choice':
    case 'open-choice':
      return buildFHIRValueFromOption(item, value);
    default:
      // type not supported
      return null;
  }
};

export const parseExtensions = (extensions: fhir4.Extension[]): NumQuestionnaireExtensionConfig => {
  return extensions.reduce(
    (config, extension) =>
      Object.assign(config, {
        [extension.url.replace('http://hl7.org/fhir/StructureDefinition/', '')]: extractValue(extension),
      }),
    {}
  );
};

/**
 * Returns an FNV-1a hash to check if
 * json-stringified questionnaire has
 * changed in order to drop persisted
 * answers if necessary
 * @param data string
 * @returns string
 */
export const getHash = (data: string) => {
  return (
    data.split('').reduce((hash, character: any) => {
      hash ^= character;
      return hash + (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }, 0x811c9dc5) >>> 0
  ).toString(16);
};

export const buildQuestionnaireResponseItem = (
  flattenedItems: NUMQuestionnaireFlattenedItem[],
  linkId: string
): fhir4.QuestionnaireResponseItem => {
  const item = flattenedItems.find((item) => item.linkId === linkId);
  const answer = item.isEnabled && item.isAnswered ? item?.answer?.filter(isValidValue) : [];
  if (!item) {
    return null;
  }

  return {
    linkId,
    text: item.text,
    ...(answer?.length ? { answer: answer.map((value) => buildFHIRValue(item, value)).filter(Boolean) } : {}),
    ...(item.item
      ? {
          item: item.item
            .map((subItem) => buildQuestionnaireResponseItem(flattenedItems, subItem.linkId))
            .filter(Boolean),
        }
      : {}),
    ...(item.definition ? { definition: item.definition } : {}),
  };
};

/**
 * see https://github.com/NUMde/compass-numapp/tree/main/docs/encryption
 */
export const encrypt = (pem: string, payload: object): string => {
  const p7 = forge.pkcs7.createEnvelopedData();
  p7.content = forge.util.createBuffer();
  p7.content.putString(JSON.stringify(payload));
  p7.addRecipient(forge.pki.certificateFromPem(pem));
  p7.encrypt();

  return btoa(
    forge.util
      .bytesToHex(forge.asn1.toDer(p7.toAsn1()).data)
      .match(/\w{2}/g)
      .map((value) => String.fromCharCode(parseInt(value, 16)))
      .join('')
  );
};