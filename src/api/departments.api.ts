import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import { ENDPOINTS } from '../config/api.config';
import type {
  Department,
  CreateDepartmentPayload,
  UpdateDepartmentPayload,
  DeleteDepartmentResponse,
  PaginationParams,
} from '../types/api.types';

export const departmentsApi = {
  getAll: async (
    institutionId: string,
    params?: PaginationParams
  ): Promise<Department[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getDepartments(institutionId);
    }
    
    const queryParams = new URLSearchParams();
    if (params?.offset !== undefined) queryParams.append('offset', params.offset.toString());
    if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params?.filter) queryParams.append('filter', params.filter);
    
    const url = queryParams.toString()
      ? `${ENDPOINTS.DEPARTMENTS.BASE(institutionId)}?${queryParams.toString()}`
      : ENDPOINTS.DEPARTMENTS.BASE(institutionId);
    
    return apiClient.get<Department[]>(url);
  },

  getAllDepartments: async (): Promise<Department[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getAllDepartments();
    }
    return apiClient.get<Department[]>('/api/departments');
  },

  getById: async (institutionId: string, id: string): Promise<Department> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getDepartmentById(institutionId, id);
    }
    return apiClient.get<Department>(
      ENDPOINTS.DEPARTMENTS.BY_ID(institutionId, id)
    );
  },

  create: async (
    institutionId: string,
    data: CreateDepartmentPayload
  ): Promise<Department> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createDepartment(institutionId, data);
    }
    return apiClient.post<Department>(
      ENDPOINTS.DEPARTMENTS.BASE(institutionId),
      data
    );
  },

  update: async (
    institutionId: string,
    id: string,
    data: UpdateDepartmentPayload
  ): Promise<Department> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateDepartment(institutionId, id, data);
    }
    return apiClient.patch<Department>(
      ENDPOINTS.DEPARTMENTS.BY_ID(institutionId, id),
      data
    );
  },

  delete: async (
    institutionId: string,
    id: string
  ): Promise<DeleteDepartmentResponse> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteDepartment(institutionId, id);
    }
    return apiClient.delete<DeleteDepartmentResponse>(
      ENDPOINTS.DEPARTMENTS.BY_ID(institutionId, id)
    );
  },
};