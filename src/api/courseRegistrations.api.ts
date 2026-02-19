// Course Registration API
import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import type {
  CourseRegistration,
  CreateCourseRegistrationPayload,
  UpdateCourseRegistrationPayload,
} from '../types/api.types';

export const courseRegistrationsApi = {
  getByStudentId: async (studentId: string, termId?: string): Promise<CourseRegistration[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getCourseRegistrations(studentId, termId);
    }
    const url = termId
      ? `/students/${studentId}/registrations?term_id=${termId}`
      : `/students/${studentId}/registrations`;
    const response = await apiClient.get(url);
    return response.data;
  },

  getBySectionId: async (sectionId: string): Promise<CourseRegistration[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getCourseRegistrationsBySection(sectionId);
    }
    const response = await apiClient.get(`/course-sections/${sectionId}/registrations`);
    return response.data;
  },

  getById: async (id: string): Promise<CourseRegistration> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getCourseRegistration(id);
    }
    const response = await apiClient.get(`/course-registrations/${id}`);
    return response.data;
  },

  register: async (data: CreateCourseRegistrationPayload): Promise<CourseRegistration> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createCourseRegistration(data);
    }
    const response = await apiClient.post('/course-registrations', data);
    return response.data;
  },

  drop: async (id: string): Promise<{ id: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteCourseRegistration(id);
    }
    const response = await apiClient.delete(`/course-registrations/${id}`);
    return response.data;
  },

  update: async (id: string, data: UpdateCourseRegistrationPayload): Promise<CourseRegistration> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateCourseRegistration(id, data);
    }
    const response = await apiClient.put(`/course-registrations/${id}`, data);
    return response.data;
  },
};
