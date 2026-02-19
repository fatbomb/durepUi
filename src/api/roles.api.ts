// src/api/roles.api.ts

import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import { ENDPOINTS } from '../config/api.config';
import type {
  UserRole,
  CreateRolePayload,
  UpdateRolePayload,
  DeleteRoleResponse,
} from '../types/api.types';

export const rolesApi = {
  getAll: async (userId: string): Promise<UserRole[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getUserRoles(userId);
    }
    return apiClient.get<UserRole[]>(ENDPOINTS.ROLES.BASE(userId));
  },

  getById: async (userId: string, roleId: string): Promise<UserRole> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      const roles = await MockApiClient.getUserRoles(userId);
      const role = roles.find(r => r.id === roleId);
      if (!role) throw new Error("Role not found");
      return role;
    }
    return apiClient.get<UserRole>(ENDPOINTS.ROLES.BY_ID(userId, roleId));
  },

  create: async (userId: string, data: CreateRolePayload): Promise<UserRole> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createUserRole(userId, data);
    }
    return apiClient.post<UserRole>(ENDPOINTS.ROLES.BASE(userId), data);
  },

  update: async (
    userId: string,
    roleId: string,
    data: UpdateRolePayload
  ): Promise<UserRole> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateUserRole(userId, roleId, data);
    }
    return apiClient.patch<UserRole>(
      ENDPOINTS.ROLES.BY_ID(userId, roleId),
      data
    );
  },

  delete: async (userId: string, roleId: string): Promise<DeleteRoleResponse> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteUserRole(userId, roleId);
    }
    return apiClient.delete<DeleteRoleResponse>(
      ENDPOINTS.ROLES.BY_ID(userId, roleId)
    );
  },
};