// Course Sections API
import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import type {
  CourseSection,
  CreateCourseSectionPayload,
  UpdateCourseSectionPayload,
} from '../types/api.types';

export const courseSectionsApi = {
  getAll: async (termId?: string, courseId?: string): Promise<CourseSection[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getCourseSections(termId, courseId);
    }
    const url = '/course-sections';
    const params: Record<string, string> = {};
    if (termId) params.term_id = termId;
    if (courseId) params.course_id = courseId;
    return apiClient.get<CourseSection[]>(url, params);
  },

  getById: async (id: string): Promise<CourseSection> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getCourseSection(id);
    }
    return apiClient.get<CourseSection>(`/course-sections/${id}`);
  },

  create: async (data: CreateCourseSectionPayload): Promise<CourseSection> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createCourseSection(data);
    }
    return apiClient.post<CourseSection>('/course-sections', data);
  },

  update: async (id: string, data: UpdateCourseSectionPayload): Promise<CourseSection> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateCourseSection(id, data);
    }
    return apiClient.put<CourseSection>(`/course-sections/${id}`, data);
  },

  delete: async (id: string): Promise<{ id: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteCourseSection(id);
    }
    return apiClient.delete<{ id: string }>(`/course-sections/${id}`);
  },
};
