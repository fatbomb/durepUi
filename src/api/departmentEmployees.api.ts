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
    return apiClient.get<DepartmentEmployee[]>(url, params as Record<string, any>);
  },

  getById: async (id: string): Promise<DepartmentEmployee> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      const employees = await MockApiClient.getDepartmentEmployees();
      const employee = employees.find(e => e.id === id);
      if (!employee) throw new Error('Employee not found');
      return employee;
    }
    return apiClient.get<DepartmentEmployee>(`/department-employees/${id}`);
  },

  create: async (data: CreateDepartmentEmployeePayload): Promise<DepartmentEmployee> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createDepartmentEmployee(data);
    }
    return apiClient.post<DepartmentEmployee>('/department-employees', data);
  },

  update: async (id: string, data: UpdateDepartmentEmployeePayload): Promise<DepartmentEmployee> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateDepartmentEmployee(id, data);
    }
    return apiClient.put<DepartmentEmployee>(`/department-employees/${id}`, data);
  },

  delete: async (id: string): Promise<{ id: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteDepartmentEmployee(id);
    }
    return apiClient.delete<{ id: string }>(`/department-employees/${id}`);
  },
};
