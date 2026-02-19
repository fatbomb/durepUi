// Classroom Materials API
import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import type {
  CourseMaterial,
  CreateCourseMaterialPayload,
  UpdateCourseMaterialPayload,
} from '../types/api.types';

export const classroomMaterialsApi = {
  getBySectionId: async (sectionId: string): Promise<CourseMaterial[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getCourseMaterials(sectionId);
    }
    const response = await apiClient.get(`/course-sections/${sectionId}/materials`);
    return response.data;
  },

  getById: async (id: string): Promise<CourseMaterial> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getCourseMaterial(id);
    }
    const response = await apiClient.get(`/course-materials/${id}`);
    return response.data;
  },

  upload: async (data: CreateCourseMaterialPayload): Promise<CourseMaterial> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createCourseMaterial(data);
    }
    const response = await apiClient.post('/course-materials', data);
    return response.data;
  },

  update: async (id: string, data: UpdateCourseMaterialPayload): Promise<CourseMaterial> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateCourseMaterial(id, data);
    }
    const response = await apiClient.put(`/course-materials/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ id: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteCourseMaterial(id);
    }
    const response = await apiClient.delete(`/course-materials/${id}`);
    return response.data;
  },

  download: async (id: string): Promise<Blob> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      throw new Error('File download not supported in mock mode');
    }
    const response = await apiClient.get(`/course-materials/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
