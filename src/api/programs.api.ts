import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import { ENDPOINTS } from '../config/api.config';
import type {
  Program,
  CreateProgramPayload,
  UpdateProgramPayload,
  DeleteProgramResponse,
  PaginationParams,
} from '../types/api.types';

export const programsApi = {
  getAll: async (
    departmentId: string,
    params?: PaginationParams
  ): Promise<Program[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getPrograms(departmentId);
    }
    
    const queryParams = new URLSearchParams();
    if (params?.offset !== undefined) queryParams.append('offset', params.offset.toString());
    if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params?.filter) queryParams.append('filter', params.filter);
    
    const url = queryParams.toString()
      ? `${ENDPOINTS.PROGRAMS.BASE(departmentId)}?${queryParams.toString()}`
      : ENDPOINTS.PROGRAMS.BASE(departmentId);
    
    return apiClient.get<Program[]>(url);
  },

  getAllPrograms: async (): Promise<Program[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getAllPrograms();
    }
    return apiClient.get<Program[]>('/api/programs');
  },

  getById: async (departmentId: string, id: string): Promise<Program> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getProgramById(departmentId, id);
    }
    return apiClient.get<Program>(
      ENDPOINTS.PROGRAMS.BY_ID(departmentId, id)
    );
  },

  create: async (
    departmentId: string,
    data: CreateProgramPayload
  ): Promise<Program> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createProgram(departmentId, data);
    }
    return apiClient.post<Program>(
      ENDPOINTS.PROGRAMS.BASE(departmentId),
      data
    );
  },

  update: async (
    departmentId: string,
    id: string,
    data: UpdateProgramPayload
  ): Promise<Program> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateProgram(departmentId, id, data);
    }
    return apiClient.patch<Program>(
      ENDPOINTS.PROGRAMS.BY_ID(departmentId, id),
      data
    );
  },

  delete: async (
    departmentId: string,
    id: string
  ): Promise<DeleteProgramResponse> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteProgram(departmentId, id);
    }
    return apiClient.delete<DeleteProgramResponse>(
      ENDPOINTS.PROGRAMS.BY_ID(departmentId, id)
    );
  },
};