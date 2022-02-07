// define window location as for some reason it is not set when mocked by stencil
window.location.href = 'http://localhost:3000';

import { createObservableMap, ObservableMap } from '@stencil/store';
import forge from 'node-forge';
import {
  buildFlags,
  buildQuestionnaireResponse,
  extractLabel,
  extractQuestions,
  extractValue,
  flattenNestedItems,
  generateEncryptedPayload,
  getHash,
  isValidValue,
  parseExtensions,
} from './questionnaire';
import { NUMQuestionnaireAnswer, NUMQuestionnaireFlattenedItem } from 'services/questionnaire';

import EXAMPLE_QUESTIONNAIRE from './spec/example-questionnaire.json';
import EXAMPLE_QUESTIONNAIRE_ANSWERS from './spec/example-questionnaire-answers.json';
import EXAMPLE_QUESTIONNAIRE_FLATTENED_ITEMS from './spec/example-questionnaire-flattened-items.json';
import EXAMPLE_QUESTIONNAIRE_RESPONSE from './spec/example-questionnaire-response.json';

import EXAMPLE_CERTIFICATE_PEM from './spec/example-certificate-pem.json';
import EXAMPLE_PRIVATE_KEY_PEM from './spec/example-private-key-pem.json';

import { TRIGGER_RULES } from 'config';

const QUESTIONNAIRE = EXAMPLE_QUESTIONNAIRE as fhir4.Questionnaire;
const QUESTIONNAIRE_ANSWERS = createObservableMap(EXAMPLE_QUESTIONNAIRE_ANSWERS as unknown) as ObservableMap<{
  [key: string]: NUMQuestionnaireAnswer;
}>;
const FLATTENED_ITEMS = EXAMPLE_QUESTIONNAIRE_FLATTENED_ITEMS as unknown as NUMQuestionnaireFlattenedItem[];
const QUESTIONNAIRE_RESPONSE = EXAMPLE_QUESTIONNAIRE_RESPONSE as fhir4.QuestionnaireResponse;

const USER_ID = 'unit-test';

// btoa is used in the questionnaire util, but not available like this in node
global.btoa = (value: string) => Buffer.from(value, 'binary').toString('base64');

describe('questionnaire util', () => {
  /**
   * We are removing the parent props in order to reduce the file size of the example.
   * Outside of this test, the parent prop is a reference to the parent item if exists,
   * else the questionnaire root.
   */
  it('flattens the nested questionnaire items', () => {
    const flattenedItems = flattenNestedItems(QUESTIONNAIRE.item, QUESTIONNAIRE);
    expect(flattenedItems.every(({ parent }) => !!parent)).toBe(true);
    expect(flattenedItems.every(({ level }) => typeof level === 'number')).toBe(true);
    expect(
      flattenedItems.map((item) => ({
        ...item,
        parent: `[... ${
          typeof (item.parent as NUMQuestionnaireFlattenedItem).level === 'number'
            ? `item with linkId ${(item.parent as NUMQuestionnaireFlattenedItem).linkId}`
            : 'questionnaire root'
        }]`,
      }))
    ).toEqual(EXAMPLE_QUESTIONNAIRE_FLATTENED_ITEMS);
  });

  it('extracts the questions from the flattened questionnaire items', () => {
    const extractedQuestions = extractQuestions(FLATTENED_ITEMS);
    expect(extractedQuestions.filter(({ type }) => type === 'group').length).toBe(0);
  });

  it('tells if a value is valid', () => {
    expect(isValidValue(false)).toBe(true);
    expect(isValidValue('foo')).toBe(true);
    expect(isValidValue(5)).toBe(true);
    expect(isValidValue('')).toBe(false);
    expect(isValidValue(null)).toBe(false);
    expect(isValidValue(undefined)).toBe(false);
  });

  it('extracts the values from an answer', () => {
    const extractResponseItems = (items: fhir4.QuestionnaireResponseItem[]) => {
      return items.reduce(
        (questions, item) => questions.concat(item).concat(item.item ? extractResponseItems(item.item) : []),
        []
      );
    };
    const flattenedResponseItems = extractResponseItems(QUESTIONNAIRE_RESPONSE.item);
    flattenedResponseItems.forEach(({ linkId, answer }) => {
      const extractedAnswer = answer?.map((rawValue) => extractValue(rawValue));
      expect(extractedAnswer ?? []).toEqual(QUESTIONNAIRE_ANSWERS.get(linkId) ?? []);
    });
  });

  it('extracts the label of an answer option', () => {
    expect(extractLabel({})).toBe(undefined);
    expect(extractLabel({ valueString: 'baz' })).toBe('baz');
    expect(
      extractLabel({
        valueCoding: {
          code: 'foo',
          display: 'bar',
        },
      })
    ).toBe('bar');
  });

  it('builds a questionnaire response from the question and the answers', () => {
    const builtQuestionnaireResponse = buildQuestionnaireResponse(USER_ID, {
      flattenedItems: FLATTENED_ITEMS.map((item) => ({
        ...item,
        answer: QUESTIONNAIRE_ANSWERS.get(item.linkId),
        isEnabled: true,
        isAnswered: true,
      })),
      questionnaire: QUESTIONNAIRE,
      isCompleted: true,
    } as any);

    expect(builtQuestionnaireResponse).toEqual({
      ...QUESTIONNAIRE_RESPONSE,
      identifier: {
        ...QUESTIONNAIRE_RESPONSE.identifier,
        value: builtQuestionnaireResponse.identifier.value,
      },
      authored: builtQuestionnaireResponse.authored,
    });
  });

  it('parses the extensions of a questionnaire item', () => {
    const questionWithExtension = FLATTENED_ITEMS.find(({ extension }) => !!extension);
    expect(parseExtensions(questionWithExtension.extension)).toEqual({
      maxValue: 15,
      minValue: 5,
      'questionnaire-itemControl': 'slider',
      'questionnaire-sliderStepValue': 1,
    });
  });

  /**
   * By generating a hash, we can check if the questionnaire has changed,
   * and with that delete all locally persisted answers if there are any,
   * so that the user has to start from scratch.
   * The example questionnaire might change from time to time, so in
   * order to keep the test maintenance effort low we are simply hashing
   * a test object here to have a static hash to test against.
   */
  it('generates a hash of the json-stringified questionnaire', () => {
    expect(
      getHash(
        JSON.stringify({
          foo: 'bar',
          bar: [{ baz: 'foo' }],
        })
      )
    ).toBe('f2b1f37');
  });

  it('builds trigger flags', () => {
    const builtFlags = buildFlags({ answers: QUESTIONNAIRE_ANSWERS } as any);
    TRIGGER_RULES.forEach(({ type }) => expect(builtFlags[type]).toMatch(/true|false/));
  });

  /**
   * Apart from this test, private keys must never be provided in this repository.
   * The private key is handed to the downloader script only, so it can decrypt
   * the questionnaire responses and reports.
   * In this test, we are using an example certificate and private key in order
   * to test the full encryption -> decryption flow.
   */
  it('generates a decryptable encrypted payload', () => {
    const encryptedPayload = generateEncryptedPayload({
      type: 'report',
      accessToken: USER_ID,
      certificatePem: EXAMPLE_CERTIFICATE_PEM,
      questionnaireResponse: {} as fhir4.QuestionnaireResponse,
    });

    const data = JSON.parse(encryptedPayload).payload;
    const p7 = forge.pkcs7.messageFromPem(`-----BEGIN PKCS7-----\n${data}\n-----END PKCS7-----`);
    p7.decrypt(p7.recipients[0], forge.pki.privateKeyFromPem(EXAMPLE_PRIVATE_KEY_PEM));
    expect(JSON.parse(p7.content.data)).toEqual({
      type: 'report',
      data: { subjectId: 'unit-test', body: {} },
    });
  });
});
