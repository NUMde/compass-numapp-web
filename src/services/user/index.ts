import { API_BASE_URL } from 'global/constants';
import store from 'store';
import { get } from 'services/utils/fetch-client';
import { IUser, UserResponse } from './types';

export default class User implements IUser {
  async fetch(id: string) {
    const [data] = await get<UserResponse>({ url: `${API_BASE_URL}/user/${id}` });
    return data;
  }

  async populateStore() {
    const userId = store.auth.accessToken;
    if (!userId) {
      store.user.reset();
      return;
    }

    if (store.user.isPopulated) {
      return;
    }

    try {
      const userResponse = await this.fetch(userId);
      if (userResponse.study_id !== userId) {
        throw new Error();
      }

      store.user.populateFromUserResponse(userResponse);
    } catch (e) {
      store.auth.expireSession();
    }
  }
}

export * from './types';
