import forge from 'node-forge';
import { NUMQuestionnaireQuestion } from 'models/question';
import {
  NUMQuestionnaireSimpleValue,
  NUMQuestionnaireExtensionConfig,
  NUMQuestionnaireFlattenedItem,
} from 'services/questionnaire';
import { QuestionnaireStore } from 'stores/questionnaire';
import {
  FHIR_RESPONSE_TRANSFERRED_EXTENSION_KEYS,
  FHIR_SUPPORTED_EXTENSION_BASE_URLS,
  TRIGGER_RULES,
} from 'config';

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
    (item as fhir4.Extension).valueCodeableConcept?.coding?.[0]?.code ??
    (item as fhir4.Extension).valueCodeableConcept?.coding?.[0]?.display ??
    item.valueCoding?.code ??
    item.valueCoding?.display ??
    item.valueDecimal ??
    item.valueInteger ??
    item.valueDate ??
    item.valueDateTime ??
    (item as fhir4.Extension).valueInstant ??
    item.valueTime ??
    item.valueString ??
    item.valueQuantity?.value ??
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

export const parseExtension = (extension: fhir4.Extension): [string, NUMQuestionnaireSimpleValue] => [
  FHIR_SUPPORTED_EXTENSION_BASE_URLS.reduce((url, baseUrl) => url.replace(`${baseUrl}/`, ''), extension.url),
  extractValue(extension),
];

export const parseExtensions = (extensions: fhir4.Extension[]): NUMQuestionnaireExtensionConfig => {
  return extensions.reduce((config, extension) => {
    const [key, value] = parseExtension(extension);
    return Object.assign(config, {
      [key]: value,
    });
  }, {});
};

export const getTransferableExtensions = (item: NUMQuestionnaireFlattenedItem) => {
  return (item.extension ?? []).filter((extension) => {
    const [key] = parseExtension(extension);
    return FHIR_RESPONSE_TRANSFERRED_EXTENSION_KEYS.includes(key);
  });
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

  const transferableExtensions = getTransferableExtensions(item);

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
    ...(transferableExtensions.length ? { extension: transferableExtensions } : {}),
  };
};

export const buildQuestionnaireResponse = (
  userId: string,
  questionnaireStore: QuestionnaireStore
): fhir4.QuestionnaireResponse => {
  const date = new Date();
  const { flattenedItems, questionnaire, isCompleted } = questionnaireStore;

  return {
    source: {
      identifier: {
        value: `urn:uuid:${userId}`,
        system: 'urn:ietf:rfc:3986',
      },
    },
    resourceType: 'QuestionnaireResponse',
    identifier: {
      value: `urn:uuid:${userId}-response-${date.getTime()}`,
      system: 'urn:ietf:rfc:3986',
    },
    status: isCompleted ? 'completed' : 'in-progress',
    authored: date.toISOString(),
    questionnaire: [questionnaire.url, questionnaire.version]
      .filter((segment) => (typeof segment === 'string' && !!segment) || typeof segment === 'number')
      .join('|'),
    item:
      questionnaire.item
        ?.map((item) => buildQuestionnaireResponseItem(flattenedItems, item.linkId))
        .filter(Boolean) ?? [],
  };
};

export const buildFlags = (questionnaireStore: QuestionnaireStore) => {
  const answers = questionnaireStore.answers;

  return TRIGGER_RULES.reduce(
    (flags, rule) => ({
      ...flags,
      [rule.type]: String(
        Object.keys(rule.answers).some((linkId) =>
          rule.answers[linkId].every((value) => (answers.get(linkId) ?? []).includes(value))
        )
      ),
    }),
    {}
  );
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

export const generateEncryptedPayload = ({
  type,
  accessToken,
  certificatePem,
  questionnaireResponse,
}: {
  type: 'report' | 'questionnaire_response';
  accessToken: string;
  certificatePem: string;
  questionnaireResponse?: fhir4.QuestionnaireResponse;
}): string => {
  const payload = {
    type,
    data: {
      subjectId: accessToken,
      ...(questionnaireResponse ? { body: questionnaireResponse } : {}),
    },
  };

  return JSON.stringify({ payload: encrypt(certificatePem, payload) });
};
