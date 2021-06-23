import { Env } from '@stencil/core';

export * from './features';
export * from './fhir';
export * from './localization';
export * from './navigation';

export const { API_BASE_URL, ENVIRONMENT, FALLBACK_CERTIFICATE } = Env;
