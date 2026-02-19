// Academic Terms API
import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import type {
  AcademicTerm,
  CreateAcademicTermPayload,
  UpdateAcademicTermPayload,
} from '../types/api.types';

export const academicTermsApi = {
  getAll: async (): Promise<AcademicTerm[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getAcademicTerms();
    }
    return apiClient.get<AcademicTerm[]>('/academic-terms');
  },

  getById: async (id: string): Promise<AcademicTerm> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getAcademicTerm(id);
    }
    return apiClient.get<AcademicTerm>(`/academic-terms/${id}`);
  },

  create: async (data: CreateAcademicTermPayload): Promise<AcademicTerm> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createAcademicTerm(data);
    }
    return apiClient.post<AcademicTerm>('/academic-terms', data);
  },

  update: async (id: string, data: UpdateAcademicTermPayload): Promise<AcademicTerm> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateAcademicTerm(id, data);
    }
    return apiClient.put<AcademicTerm>(`/academic-terms/${id}`, data);
  },

  delete: async (id: string): Promise<{ id: string; name: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteAcademicTerm(id);
    }
    return apiClient.delete<{ id: string; name: string }>(`/academic-terms/${id}`);
  },
};
