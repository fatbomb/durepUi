import { useState, useEffect } from 'react';
import { departmentsApi } from '../api/departments.api';
import type {
  Department,
  CreateDepartmentPayload,
  UpdateDepartmentPayload,
  ApiError,
  PaginationParams,
} from '../types/api.types';
import { toast } from 'react-toastify';

export const useDepartments = (
  institutionId: string | null = null,
  params?: PaginationParams,
  autoFetch = true
) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      let data: Department[];
      if (institutionId) {
        data = await departmentsApi.getAll(institutionId, params);
      } else {
        // Fetch all departments if no institutionId is provided
        data = await departmentsApi.getAllDepartments();
      }
      setDepartments(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch departments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchDepartments();
    }
  }, [institutionId, params?.offset, params?.limit, params?.filter]);

  const createDepartment = async (
    data: CreateDepartmentPayload
  ): Promise<Department | null> => {
    if (!institutionId) return null;

    setLoading(true);
    setError(null);
    try {
      const department = await departmentsApi.create(institutionId, data);
      setDepartments((prev) => [...prev, department]);
      toast.success('Department created successfully');
      return department;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to create department');
      toast.error(apiError.message || 'Failed to create department');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateDepartment = async (
    id: string,
    data: UpdateDepartmentPayload
  ): Promise<Department | null> => {
    if (!institutionId) return null;

    setLoading(true);
    setError(null);
    try {
      const department = await departmentsApi.update(institutionId, id, data);
      setDepartments((prev) =>
        prev.map((dept) => (dept.id === id ? department : dept))
      );
      toast.success('Department updated successfully');
      return department;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to update department');
      toast.error(apiError.message || 'Failed to update department');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteDepartment = async (id: string): Promise<boolean> => {
    if (!institutionId) return false;

    setLoading(true);
    setError(null);
    try {
      await departmentsApi.delete(institutionId, id);
      setDepartments((prev) => prev.filter((dept) => dept.id !== id));
      toast.success('Department deleted successfully');
      return true;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to delete department');
      toast.error(apiError.message || 'Failed to delete department');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    departments,
    loading,
    error,
    fetchDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  };
};