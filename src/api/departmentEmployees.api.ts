// Department Employees API
import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import type {
  DepartmentEmployee,
  CreateDepartmentEmployeePayload,
  UpdateDepartmentEmployeePayload,
  PaginationParams,
} from '../types/api.types';

export const departmentEmployeesApi = {
  getAll: async (departmentId?: string, params?: PaginationParams): Promise<DepartmentEmployee[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getDepartmentEmployees(departmentId);
    }
    const url = departmentId 
      ? `/departments/${departmentId}/employees`
      : '/department-employees';
    const response = await apiClient.get(url, { params });
    return response.data;
  },

  getById: async (id: string): Promise<DepartmentEmployee> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getDepartmentEmployee(id);
    }
    const response = await apiClient.get(`/department-employees/${id}`);
    return response.data;
  },

  create: async (data: CreateDepartmentEmployeePayload): Promise<DepartmentEmployee> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createDepartmentEmployee(data);
    }
    const response = await apiClient.post('/department-employees', data);
    return response.data;
  },

  update: async (id: string, data: UpdateDepartmentEmployeePayload): Promise<DepartmentEmployee> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateDepartmentEmployee(id, data);
    }
    const response = await apiClient.put(`/department-employees/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ id: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteDepartmentEmployee(id);
    }
    const response = await apiClient.delete(`/department-employees/${id}`);
    return response.data;
  },
};
