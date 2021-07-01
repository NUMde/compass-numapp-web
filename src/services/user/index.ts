import { API_BASE_URL, API_USER_URI } from 'config';
import stores from 'stores';
import { get } from 'utils/fetch-client';
import { IUserService, UserResponse } from './types';

export default class User implements IUserService {
  async fetch(id: string) {
    const [data] = await get<UserResponse>({ url: `${API_BASE_URL}/${API_USER_URI.replace(':id', id)}` });
    return data;
  }

  async populateStore(refresh = false) {
    const userId = stores.auth.accessToken;
    if (!userId) {
      stores.user.reset();
      return;
    }

    if (!refresh && stores.user.isPopulated) {
      return;
    }

    try {
      const userResponse = await this.fetch(userId);
      if (userResponse.subjectId !== userId) {
        throw new Error();
      }

      stores.auth.certificate = userResponse.recipient_certificate_pem_string;
      stores.user.populateFromUserResponse(userResponse);
    } catch (_) {
      stores.auth.expireSession();
    }
  }

  async refresh() {
    await this.populateStore(true);
  }
}

export * from './types';
