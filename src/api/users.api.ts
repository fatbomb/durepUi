// src/api/users.api.ts

import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import { ENDPOINTS } from '../config/api.config';
import type {
  User,
  CreateUserPayload,
  UpdateUserPayload,
  UsersQueryParams,
  DeleteUserResponse,
} from '../types/api.types';

export const usersApi = {
  getAll: async (params?: UsersQueryParams): Promise<User[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getUsers();
    }
    return apiClient.get<User[]>(ENDPOINTS.USERS.BASE, params);
  },

  getById: async (id: string): Promise<User> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getUserById(id);
    }
    return apiClient.get<User>(ENDPOINTS.USERS.BY_ID(id));
  },

  create: async (data: CreateUserPayload): Promise<User> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createUser(data);
    }
    return apiClient.post<User>(ENDPOINTS.USERS.BASE, data);
  },

  update: async (id: string, data: UpdateUserPayload): Promise<User> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateUser(id, data);
    }
    return apiClient.patch<User>(ENDPOINTS.USERS.BY_ID(id), data);
  },

  delete: async (id: string): Promise<DeleteUserResponse> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteUser(id);
    }
    return apiClient.delete<DeleteUserResponse>(ENDPOINTS.USERS.BY_ID(id));
  },
};