import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import { ENDPOINTS } from '../config/api.config';
import type {
  Course,
  CreateCoursePayload,
  UpdateCoursePayload,
  DeleteCourseResponse,
  PaginationParams,
} from '../types/api.types';

export const coursesApi = {
  getAll: async (params?: PaginationParams): Promise<Course[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getCourses();
    }
    
    const queryParams = new URLSearchParams();
    if (params?.offset !== undefined) queryParams.append('offset', params.offset.toString());
    if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params?.filter) queryParams.append('filter', params.filter);
    
    const url = queryParams.toString()
      ? `${ENDPOINTS.COURSES.BASE}?${queryParams.toString()}`
      : ENDPOINTS.COURSES.BASE;
    
    return apiClient.get<Course[]>(url);
  },

  getById: async (id: string): Promise<Course> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getCourseById(id);
    }
    return apiClient.get<Course>(ENDPOINTS.COURSES.BY_ID(id));
  },

  create: async (data: CreateCoursePayload): Promise<Course> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createCourse(data);
    }
    return apiClient.post<Course>(ENDPOINTS.COURSES.BASE, data);
  },

  update: async (id: string, data: UpdateCoursePayload): Promise<Course> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateCourse(id, data);
    }
    return apiClient.patch<Course>(ENDPOINTS.COURSES.BY_ID(id), data);
  },

  delete: async (id: string): Promise<DeleteCourseResponse> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteCourse(id);
    }
    return apiClient.delete<DeleteCourseResponse>(
      ENDPOINTS.COURSES.BY_ID(id)
    );
  },
};