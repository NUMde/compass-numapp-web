import { FEATURES_ENABLE_PERSISTENCE } from 'config';

let storage: Storage = null;
try {
  FEATURES_ENABLE_PERSISTENCE && (storage = window.localStorage);
} catch (error) {
  console.error('localStorage unavailable: ', error);
}

export const STORAGE = storage;
