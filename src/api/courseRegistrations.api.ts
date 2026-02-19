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
  getByStudentId: async (studentId: string, _termId?: string): Promise<CourseRegistration[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getCourseRegistrations(studentId);
    }
    const url = _termId
      ? `/students/${studentId}/registrations?term_id=${_termId}`
      : `/students/${studentId}/registrations`;
    return apiClient.get<CourseRegistration[]>(url);
  },

  getBySectionId: async (sectionId: string): Promise<CourseRegistration[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getCourseRegistrations(undefined, sectionId);
    }
    return apiClient.get<CourseRegistration[]>(`/course-sections/${sectionId}/registrations`);
  },

  getById: async (id: string): Promise<CourseRegistration> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      const registrations = await MockApiClient.getCourseRegistrations();
      const registration = registrations.find(r => r.id === id);
      if (!registration) throw new Error('Registration not found');
      return registration;
    }
    return apiClient.get<CourseRegistration>(`/course-registrations/${id}`);
  },

  register: async (data: CreateCourseRegistrationPayload): Promise<CourseRegistration> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createCourseRegistration(data);
    }
    return apiClient.post<CourseRegistration>('/course-registrations', data);
  },

  drop: async (id: string): Promise<{ id: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteCourseRegistration(id);
    }
    return apiClient.delete<{ id: string }>(`/course-registrations/${id}`);
  },

  update: async (id: string, data: UpdateCourseRegistrationPayload): Promise<CourseRegistration> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateCourseRegistration(id, data);
    }
    return apiClient.put<CourseRegistration>(`/course-registrations/${id}`, data);
  },
};
