// Instructor Assignments API
import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import type {
  CourseInstructor,
  CreateCourseInstructorPayload,
  UpdateCourseInstructorPayload,
} from '../types/api.types';

export const instructorAssignmentsApi = {
  getBySectionId: async (sectionId: string): Promise<CourseInstructor[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getCourseInstructors(sectionId);
    }
    const response = await apiClient.get(`/course-sections/${sectionId}/instructors`);
    return response.data;
  },

  getById: async (id: string): Promise<CourseInstructor> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getCourseInstructor(id);
    }
    const response = await apiClient.get(`/course-instructors/${id}`);
    return response.data;
  },

  create: async (data: CreateCourseInstructorPayload): Promise<CourseInstructor> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createCourseInstructor(data);
    }
    const response = await apiClient.post('/course-instructors', data);
    return response.data;
  },

  update: async (id: string, data: UpdateCourseInstructorPayload): Promise<CourseInstructor> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateCourseInstructor(id, data);
    }
    const response = await apiClient.put(`/course-instructors/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ id: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteCourseInstructor(id);
    }
    const response = await apiClient.delete(`/course-instructors/${id}`);
    return response.data;
  },
};
