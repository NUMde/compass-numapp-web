import { Env } from '@stencil/core';
import CUSTOM from 'custom/config';

export const { API_BASE_URL } = Env;

export const API_QUESTIONNAIRE_URI = CUSTOM.API_QUESTIONNAIRE_URI ?? 'questionnaire/:id';
export const API_QUEUE_URI = CUSTOM.API_QUEUE_URI ?? 'queue';
export const API_USER_URI = CUSTOM.API_USER_URI ?? 'participant/:id';
