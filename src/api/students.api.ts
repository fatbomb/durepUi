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
    const response = await apiClient.get(url, { params });
    return response.data;
  },

  getById: async (id: string): Promise<Student> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getStudent(id);
    }
    const response = await apiClient.get(`/students/${id}`);
    return response.data;
  },

  create: async (data: CreateStudentPayload): Promise<Student> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createStudent(data);
    }
    const response = await apiClient.post('/students', data);
    return response.data;
  },

  update: async (id: string, data: UpdateStudentPayload): Promise<Student> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateStudent(id, data);
    }
    const response = await apiClient.put(`/students/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ id: string; student_id: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteStudent(id);
    }
    const response = await apiClient.delete(`/students/${id}`);
    return response.data;
  },
};
