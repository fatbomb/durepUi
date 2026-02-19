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
    let url = '/course-sections';
    const params: any = {};
    if (termId) params.term_id = termId;
    if (courseId) params.course_id = courseId;
    const response = await apiClient.get(url, { params });
    return response.data;
  },

  getById: async (id: string): Promise<CourseSection> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getCourseSection(id);
    }
    const response = await apiClient.get(`/course-sections/${id}`);
    return response.data;
  },

  create: async (data: CreateCourseSectionPayload): Promise<CourseSection> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createCourseSection(data);
    }
    const response = await apiClient.post('/course-sections', data);
    return response.data;
  },

  update: async (id: string, data: UpdateCourseSectionPayload): Promise<CourseSection> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateCourseSection(id, data);
    }
    const response = await apiClient.put(`/course-sections/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ id: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteCourseSection(id);
    }
    const response = await apiClient.delete(`/course-sections/${id}`);
    return response.data;
  },
};
