// Students API
import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import type {
  Student,
  CreateStudentPayload,
  UpdateStudentPayload,
  PaginationParams,
} from '../types/api.types';

export const studentsApi = {
  getAll: async (departmentId?: string, params?: PaginationParams): Promise<Student[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getStudents(departmentId);
    }
    const url = departmentId 
      ? `/departments/${departmentId}/students`
      : '/students';
    return apiClient.get<Student[]>(url, params as Record<string, any>);
  },

  getById: async (id: string): Promise<Student> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getStudent(id);
    }
    return apiClient.get<Student>(`/students/${id}`);
  },

  create: async (data: CreateStudentPayload): Promise<Student> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createStudent(data);
    }
    return apiClient.post<Student>('/students', data);
  },

  update: async (id: string, data: UpdateStudentPayload): Promise<Student> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateStudent(id, data);
    }
    return apiClient.put<Student>(`/students/${id}`, data);
  },

  delete: async (id: string): Promise<{ id: string; student_id: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteStudent(id);
    }
    return apiClient.delete<{ id: string; student_id: string }>(`/students/${id}`);
  },
};
