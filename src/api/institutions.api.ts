import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import { ENDPOINTS } from '../config/api.config';
import type {
  Institution,
  CreateInstitutionPayload,
  UpdateInstitutionPayload,
  DeleteInstitutionResponse,
  PaginationParams,
} from '../types/api.types';

export const institutionsApi = {
  getAll: async (params?: PaginationParams): Promise<Institution[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getInstitutions();
    }
    
    const queryParams = new URLSearchParams();
    if (params?.offset !== undefined) queryParams.append('offset', params.offset.toString());
    if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params?.filter) queryParams.append('filter', params.filter);
    
    const url = queryParams.toString() 
      ? `${ENDPOINTS.INSTITUTIONS.BASE}?${queryParams.toString()}`
      : ENDPOINTS.INSTITUTIONS.BASE;
    
    return apiClient.get<Institution[]>(url);
  },

  getById: async (id: string): Promise<Institution> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getInstitutionById(id);
    }
    return apiClient.get<Institution>(ENDPOINTS.INSTITUTIONS.BY_ID(id));
  },

  create: async (data: CreateInstitutionPayload): Promise<Institution> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createInstitution(data);
    }
    return apiClient.post<Institution>(ENDPOINTS.INSTITUTIONS.BASE, data);
  },

  update: async (
    id: string,
    data: UpdateInstitutionPayload
  ): Promise<Institution> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateInstitution(id, data);
    }
    return apiClient.patch<Institution>(
      ENDPOINTS.INSTITUTIONS.BY_ID(id),
      data
    );
  },

  delete: async (id: string): Promise<DeleteInstitutionResponse> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteInstitution(id);
    }
    return apiClient.delete<DeleteInstitutionResponse>(
      ENDPOINTS.INSTITUTIONS.BY_ID(id)
    );
  },
};