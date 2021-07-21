import stores from 'stores';
import { ResponseError } from 'models/response-error';

interface FetchClientHeaders {
  [key: string]: string;
}

interface FetchClientArguments {
  url: string;
  authenticated?: boolean;
  method?: string;
  contentType?: string;
  sendLanguage?: boolean;
  headers?: FetchClientHeaders;
  body?: any;
  credentials?: 'omit' | 'same-origin' | 'include';
}

export const request = async <T = unknown>(args: FetchClientArguments): Promise<[T, Headers]> => {
  const {
    url,
    method = 'GET',
    authenticated = false,
    headers = {},
    sendLanguage = false,
    body = null,
    contentType = 'application/json',
    credentials = 'omit',
  } = args;

  let response;

  try {
    response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': contentType,
        ...(authenticated
          ? {
              Authorization: `Bearer ${stores.auth.accessToken}`,
            }
          : {}),
        ...(sendLanguage
          ? {
              'X-User-Language': stores.i18n?.language?.code,
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

  if (response.status === 401) {
    stores.auth.expireSession();
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
