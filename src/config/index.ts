import { Env } from '@stencil/core';

export * from './api';
export * from './features';
export * from './fhir';
export * from './localization';
export * from './navigation';

export const { ENVIRONMENT, FALLBACK_CERTIFICATE } = Env;
