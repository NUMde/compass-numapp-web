/**
 * feature flags
 */
export const FEATURES_SHOW_LOGOUT = true;
export const FEATURES_SUPPORT_QR_CODE = true;
export const FEATURES_QUESTIONNAIRE_ALLOW_FUTURE_DATES = true;
export const FEATURES_QUESTIONNAIRE_SHOW_LINKIDS = true;

/**
 * feature config
 */
export const QR_APP_NAME = 'COMPASS';
export const QR_PROP_APP_NAME = 'AppIdentifier';
export const QR_PROP_USER_ID = 'SubjectId';

export const TRIGGER_KEY_BASIC = 'basicTrigger';
export const TRIGGER_KEY_SPECIAL = 'specialTrigger';
export const TRIGGER_RULES = [
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
