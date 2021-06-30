import CUSTOM from 'custom/config';

/**
 * feature flags
 */

export const FEATURES_ENABLE_PERSISTENCE = CUSTOM.FEATURES_ENABLE_PERSISTENCE ?? true;
export const FEATURES_SHOW_LOGOUT = CUSTOM.FEATURES_SHOW_LOGOUT ?? true;
export const FEATURES_SUPPORT_QR_CODE = CUSTOM.FEATURES_SUPPORT_QR_CODE ?? true;
export const FEATURES_QUESTIONNAIRE_ALLOW_FUTURE_DATES =
  CUSTOM.FEATURES_QUESTIONNAIRE_ALLOW_FUTURE_DATES ?? true;
export const FEATURES_QUESTIONNAIRE_SHOW_LINKIDS = CUSTOM.FEATURES_QUESTIONNAIRE_SHOW_LINKIDS ?? true;
export const FEATURES_QUESTIONNAIRE_SHOW_TREE = CUSTOM.FEATURES_QUESTIONNAIRE_SHOW_TREE ?? true;

/**
 * feature config
 */

export const PERSISTENCE_SHOW_CHOICE = CUSTOM.PERSISTENCE_SHOW_CHOICE ?? true;

export const QR_APP_NAME = CUSTOM.QR_APP_NAME ?? 'COMPASS';
export const QR_PROP_APP_NAME = CUSTOM.QR_PROP_APP_NAME ?? 'AppIdentifier';
export const QR_PROP_USER_ID = CUSTOM.QR_PROP_USER_ID ?? 'SubjectId';

export const TRIGGER_KEY_BASIC = CUSTOM.TRIGGER_KEY_BASIC ?? 'basicTrigger';
export const TRIGGER_KEY_SPECIAL = CUSTOM.TRIGGER_KEY_SPECIAL ?? 'specialTrigger';
export const TRIGGER_RULES = CUSTOM.TRIGGER_RULES ?? [
  {
    type: TRIGGER_KEY_BASIC,
    answers: {
      '1.11': ['Option A'],
      '1.10.1': [true],
    },
  },
  {
    type: TRIGGER_KEY_SPECIAL,
    answers: {
      '1.18': ['Special trigger answer'],
    },
  },
];
