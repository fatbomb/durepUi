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
    const response = await apiClient.get('/academic-terms');
    return response.data;
  },

  getById: async (id: string): Promise<AcademicTerm> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getAcademicTerm(id);
    }
    const response = await apiClient.get(`/academic-terms/${id}`);
    return response.data;
  },

  create: async (data: CreateAcademicTermPayload): Promise<AcademicTerm> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createAcademicTerm(data);
    }
    const response = await apiClient.post('/academic-terms', data);
    return response.data;
  },

  update: async (id: string, data: UpdateAcademicTermPayload): Promise<AcademicTerm> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateAcademicTerm(id, data);
    }
    const response = await apiClient.put(`/academic-terms/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ id: string; name: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteAcademicTerm(id);
    }
    const response = await apiClient.delete(`/academic-terms/${id}`);
    return response.data;
  },
};
