import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import { ENDPOINTS } from '../config/api.config';
import type {
  ProgramCourse,
  CreateProgramCoursePayload,
  UpdateProgramCoursePayload,
  DeleteProgramCourseResponse,
  ProgramCourseFilterParams,
} from '../types/api.types';

export const programCoursesApi = {
  getAll: async (params?: ProgramCourseFilterParams): Promise<ProgramCourse[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getProgramCourses(params?.program_id);
    }
    
    const queryParams = new URLSearchParams();
    if (params?.offset !== undefined) queryParams.append('offset', params.offset.toString());
    if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params?.program_id) queryParams.append('program_id', params.program_id);
    if (params?.course_id) queryParams.append('course_id', params.course_id);
    
    const url = queryParams.toString()
      ? `${ENDPOINTS.PROGRAM_COURSES.BASE}?${queryParams.toString()}`
      : ENDPOINTS.PROGRAM_COURSES.BASE;
    
    return apiClient.get<ProgramCourse[]>(url);
  },

  getById: async (id: string): Promise<ProgramCourse> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      const allProgramCourses = await MockApiClient.getProgramCourses();
      const programCourse = allProgramCourses.find(pc => pc.id === id);
      if (!programCourse) throw new Error("Program course not found");
      return programCourse;
    }
    return apiClient.get<ProgramCourse>(ENDPOINTS.PROGRAM_COURSES.BY_ID(id));
  },

  create: async (data: CreateProgramCoursePayload): Promise<ProgramCourse> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createProgramCourse(data);
    }
    return apiClient.post<ProgramCourse>(
      ENDPOINTS.PROGRAM_COURSES.BASE,
      data
    );
  },

  update: async (
    id: string,
    data: UpdateProgramCoursePayload
  ): Promise<ProgramCourse> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      // Mock API doesn't support update for program courses
      throw new Error("Update not supported for program courses");
    }
    return apiClient.patch<ProgramCourse>(
      ENDPOINTS.PROGRAM_COURSES.BY_ID(id),
      data
    );
  },

  delete: async (id: string): Promise<DeleteProgramCourseResponse> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteProgramCourse(id);
    }
    return apiClient.delete<DeleteProgramCourseResponse>(
      ENDPOINTS.PROGRAM_COURSES.BY_ID(id)
    );
  },
};