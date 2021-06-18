import { API_BASE_URL } from 'config';
import store from 'store';
import { get } from 'utils/fetch-client';
import { IUserService, UserResponse } from './types';

export default class User implements IUserService {
  async fetch(id: string) {
    const [data] = await get<UserResponse>({ url: `${API_BASE_URL}/participant/${id}` });
    return data;
  }

  async populateStore(refresh = false) {
    const userId = store.auth.accessToken;
    if (!userId) {
      store.user.reset();
      return;
    }

    if (!refresh && store.user.isPopulated) {
      return;
    }

    try {
      const userResponse = await this.fetch(userId);
      if (userResponse.subjectId !== userId) {
        throw new Error();
      }

      store.auth.certificate = userResponse.recipient_certificate_pem_string;
      store.user.populateFromUserResponse(userResponse);
    } catch (e) {
      store.auth.expireSession();
    }
  }

  async refresh() {
    await this.populateStore(true);
  }
}

export * from './types';
