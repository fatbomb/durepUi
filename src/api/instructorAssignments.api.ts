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
    return apiClient.get<CourseInstructor[]>(`/course-sections/${sectionId}/instructors`);
  },

  getById: async (id: string): Promise<CourseInstructor> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      const instructors = await MockApiClient.getCourseInstructors('');
      const instructor = instructors.find(i => i.id === id);
      if (!instructor) throw new Error('Instructor not found');
      return instructor;
    }
    return apiClient.get<CourseInstructor>(`/course-instructors/${id}`);
  },

  create: async (data: CreateCourseInstructorPayload): Promise<CourseInstructor> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createCourseInstructor(data);
    }
    return apiClient.post<CourseInstructor>('/course-instructors', data);
  },

  update: async (id: string, data: UpdateCourseInstructorPayload): Promise<CourseInstructor> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateCourseInstructor(id, data);
    }
    return apiClient.put<CourseInstructor>(`/course-instructors/${id}`, data);
  },

  delete: async (id: string): Promise<{ id: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteCourseInstructor(id);
    }
    return apiClient.delete<{ id: string }>(`/course-instructors/${id}`);
  },
};
