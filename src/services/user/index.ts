import { API_BASE_URL } from 'global/constants';
import { get } from 'services/utils/fetch-client';
import { IUser, UserResponse } from './types';

export default class User implements IUser {
  async fetch(id: string) {
    const [data] = await get<UserResponse>({ url: `${API_BASE_URL}/user/${id}` });
    return data;
  }
}

export * from './types';
