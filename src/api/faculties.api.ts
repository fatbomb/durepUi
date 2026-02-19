import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import { ENDPOINTS } from '../config/api.config';
import type {
  Faculty,
  CreateFacultyPayload,
  UpdateFacultyPayload,
  DeleteFacultyResponse,
  PaginationParams,
} from '../types/api.types';

export const facultiesApi = {
  getAll: async (
    institutionId: string,
    params?: PaginationParams
  ): Promise<Faculty[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getFaculties(institutionId);
    }
    
    const queryParams = new URLSearchParams();
    if (params?.offset !== undefined) queryParams.append('offset', params.offset.toString());
    if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params?.filter) queryParams.append('filter', params.filter);
    
    const url = queryParams.toString()
      ? `${ENDPOINTS.FACULTIES.BASE(institutionId)}?${queryParams.toString()}`
      : ENDPOINTS.FACULTIES.BASE(institutionId);
    
    return apiClient.get<Faculty[]>(url);
  },

  getAllFaculties: async (): Promise<Faculty[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getAllFaculties();
    }
    return apiClient.get<Faculty[]>('/api/faculties');
  },

  getById: async (institutionId: string, id: string): Promise<Faculty> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getFacultyById(institutionId, id);
    }
    return apiClient.get<Faculty>(
      ENDPOINTS.FACULTIES.BY_ID(institutionId, id)
    );
  },

  create: async (
    institutionId: string,
    data: CreateFacultyPayload
  ): Promise<Faculty> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createFaculty(institutionId, data);
    }
    return apiClient.post<Faculty>(
      ENDPOINTS.FACULTIES.BASE(institutionId),
      data
    );
  },

  update: async (
    institutionId: string,
    id: string,
    data: UpdateFacultyPayload
  ): Promise<Faculty> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateFaculty(institutionId, id, data);
    }
    return apiClient.patch<Faculty>(
      ENDPOINTS.FACULTIES.BY_ID(institutionId, id),
      data
    );
  },

  delete: async (
    institutionId: string,
    id: string
  ): Promise<DeleteFacultyResponse> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteFaculty(institutionId, id);
    }
    return apiClient.delete<DeleteFacultyResponse>(
      ENDPOINTS.FACULTIES.BY_ID(institutionId, id)
    );
  },
};