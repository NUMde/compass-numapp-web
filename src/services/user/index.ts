import { API_BASE_URL, API_USER_URI } from 'config';
import stores from 'stores';
import { get } from 'utils/fetch-client';
import { IUserService, UserResponse } from './types';

export default class User implements IUserService {
  async fetch(id: string, retry = false) {
    const [data] = await get<UserResponse>({ url: `${API_BASE_URL}/${API_USER_URI.replace(':id', id)}` });

    if (data.subjectId !== id) {
      throw new Error();
    }

    if (!retry && (!data.current_questionnaire_id || new Date() > new Date(data.due_date))) {
      // circumvent backend bug happening when new users are fetched for the first time
      // and another one happening when the backend serves an obsolete questionnaire
      return await this.fetch(id, true);
    }

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
