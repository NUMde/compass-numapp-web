import store from 'store';
import { ResponseError } from './response-error';

interface FetchClientHeaders {
  [key: string]: string;
}

interface FetchClientArguments {
  uri: string;
  authenticated?: boolean;
  retry?: boolean;
  wasRetry?: boolean;
  method?: string;
  contentType?: string;
  sendLanguage?: boolean;
  headers?: FetchClientHeaders;
  body?: any;
  credentials?: 'omit' | 'same-origin' | 'include';
}

let refreshSessionPromise;
const refreshSession = async () => {
  if (refreshSessionPromise) {
    return await refreshSessionPromise;
  }
  refreshSessionPromise = store.auth.refreshSession();

  try {
    return await refreshSessionPromise;
  } finally {
    refreshSessionPromise = null;
  }
};

export const request = async <T = unknown>(args: FetchClientArguments): Promise<[T, Headers]> => {
  const {
    uri,
    method = 'GET',
    authenticated = true,
    headers = {},
    retry = true,
    wasRetry = false,
    sendLanguage = true,
    body = null,
    contentType = 'application/json',
    credentials = 'omit',
  } = args;

  let response;

  try {
    response = await fetch(uri, {
      method: method,
      headers: {
        'Content-Type': contentType,
        ...(authenticated
          ? {
              Authorization: `Bearer ${store.auth.get('accessToken')}`,
            }
          : {}),
        ...(sendLanguage
          ? {
              'X-User-Language': store.i18n?.language?.code,
            }
          : {}),
        ...headers,
      },
      ...(body ? { body } : {}),
      credentials,
    });
  } catch (e) {
    // most likely network or cors error
    console.error('network error', e);
    throw new ResponseError(e.message, 0);
  }

  if (response.status === 401 && retry) {
    try {
      const isSessionRefreshed = await refreshSession();
      if (isSessionRefreshed) {
        return request({ ...args, retry: false, wasRetry: true });
      } else {
        await store.auth.expireSession();
      }
    } catch (e) {
      await store.auth.expireSession();
    }
  }

  if (response.status === 401 && wasRetry) {
    await store.auth.expireSession();
  }

  if (response.status === 204) {
    return null;
  }

  if (response.status >= 200 && response.status < 300) {
    return /application\/json/.test(response.headers.get('Content-Type') || '')
      ? [await response.json(), response.headers]
      : [await response.text(), response.headers];
  }

  throw new ResponseError(await response.text(), response.status);
};

export const get = async <T = unknown>(params: Omit<FetchClientArguments, 'method'>): Promise<[T, Headers]> =>
  request({ ...params, method: 'GET' });

export const post = async <T = unknown>(
  params: Omit<FetchClientArguments, 'method'>
): Promise<[T, Headers]> => request({ ...params, method: 'POST' });

export const put = async <T = unknown>(params: Omit<FetchClientArguments, 'method'>): Promise<[T, Headers]> =>
  request({ ...params, method: 'PUT' });

export const del = async <T = unknown>(params: Omit<FetchClientArguments, 'method'>): Promise<[T, Headers]> =>
  request({ ...params, method: 'DELETE' });

export default { request, get, post, put, del };
