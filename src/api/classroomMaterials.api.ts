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
    return apiClient.get<CourseMaterial[]>(`/course-sections/${sectionId}/materials`);
  },

  getById: async (id: string): Promise<CourseMaterial> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      const materials = await MockApiClient.getCourseMaterials('');
      const material = materials.find(m => m.id === id);
      if (!material) throw new Error('Material not found');
      return material;
    }
    return apiClient.get<CourseMaterial>(`/course-materials/${id}`);
  },

  upload: async (data: CreateCourseMaterialPayload): Promise<CourseMaterial> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createCourseMaterial(data);
    }
    return apiClient.post<CourseMaterial>('/course-materials', data);
  },

  update: async (id: string, data: UpdateCourseMaterialPayload): Promise<CourseMaterial> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateCourseMaterial(id, data);
    }
    return apiClient.put<CourseMaterial>(`/course-materials/${id}`, data);
  },

  delete: async (id: string): Promise<{ id: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteCourseMaterial(id);
    }
    return apiClient.delete<{ id: string }>(`/course-materials/${id}`);
  },

  download: async (id: string): Promise<Blob> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      throw new Error('File download not supported in mock mode');
    }
    return apiClient.get<Blob>(`/course-materials/${id}/download`);
  },
};
