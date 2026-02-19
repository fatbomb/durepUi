import { useState, useEffect } from 'react';
import { programsApi } from '../api/programs.api';
import type {
  Program,
  CreateProgramPayload,
  UpdateProgramPayload,
  ApiError,
  PaginationParams,
} from '../types/api.types';
import { toast } from 'react-toastify';

export const usePrograms = (
  departmentId: string | null,
  params?: PaginationParams,
) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    fetchPrograms();
  }, [departmentId, params?.offset, params?.limit, params?.filter]);
  
  const fetchPrograms = async () => {
    setLoading(true);
    setError(null);
    try {
      let data: Program[];
      if (departmentId) {
        data = await programsApi.getAll(departmentId, params);
      } else {
        // Fetch all programs if no departmentId is provided
        data = await programsApi.getAllPrograms();
      }
      console.log(data, "returned data")
      setPrograms(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch programs');
    } finally {
      setLoading(false);
    }
  };

  const createProgram = async (
    data: CreateProgramPayload
  ): Promise<Program | null> => {
    if (!departmentId) return null;

    setLoading(true);
    setError(null);
    try {
      const program = await programsApi.create(departmentId, data);
      setPrograms((prev) => [...prev, program]);
      toast.success('Program created successfully');
      return program;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to create program');
      toast.error(apiError.message || 'Failed to create program');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProgram = async (
    id: string,
    data: UpdateProgramPayload
  ): Promise<Program | null> => {
    if (!departmentId) return null;

    setLoading(true);
    setError(null);
    try {
      const program = await programsApi.update(departmentId, id, data);
      setPrograms((prev) =>
        prev.map((prog) => (prog.id === id ? program : prog))
      );
      toast.success('Program updated successfully');
      return program;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to update program');
      toast.error(apiError.message || 'Failed to update program');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProgram = async (id: string): Promise<boolean> => {
    if (!departmentId) return false;

    setLoading(true);
    setError(null);
    try {
      await programsApi.delete(departmentId, id);
      setPrograms((prev) => prev.filter((prog) => prog.id !== id));
      toast.success('Program deleted successfully');
      return true;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to delete program');
      toast.error(apiError.message || 'Failed to delete program');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    programs,
    loading,
    error,
    fetchPrograms,
    createProgram,
    updateProgram,
    deleteProgram,
  };
};