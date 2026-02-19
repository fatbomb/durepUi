import { useState, useEffect } from 'react';
import { facultiesApi } from '../api/faculties.api';
import type {
  Faculty,
  CreateFacultyPayload,
  UpdateFacultyPayload,
  ApiError,
  PaginationParams,
} from '../types/api.types';
import { toast } from 'react-toastify';

export const useFaculties = (
  institutionId: string | null,
  params?: PaginationParams,
  autoFetch = true
) => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFaculties = async () => {
    setLoading(true);
    setError(null);
    try {
      let data: Faculty[];
      if (institutionId) {
        data = await facultiesApi.getAll(institutionId, params);
      } else {
        // Fetch all faculties if no institutionId is provided
        data = await facultiesApi.getAllFaculties();
      }
      setFaculties(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch faculties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchFaculties();
    }
  }, [institutionId, params?.offset, params?.limit, params?.filter]);

  const createFaculty = async (
    data: CreateFacultyPayload
  ): Promise<Faculty | null> => {
    if (!institutionId) return null;

    setLoading(true);
    setError(null);
    try {
      const faculty = await facultiesApi.create(institutionId, data);
      setFaculties((prev) => [...prev, faculty]);
      toast.success("Faculty Created Successfully")
      return faculty;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to create faculty');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateFaculty = async (
    id: string,
    data: UpdateFacultyPayload
  ): Promise<Faculty | null> => {
    if (!institutionId) return null;

    setLoading(true);
    setError(null);
    try {
      const faculty = await facultiesApi.update(institutionId, id, data);
      setFaculties((prev) =>
        prev.map((fac) => (fac.id === id ? faculty : fac))
      );
      toast.success("Successfully updated faculty")
      return faculty;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to update faculty');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteFaculty = async (id: string): Promise<boolean> => {
    if (!institutionId) return false;

    setLoading(true);
    setError(null);
    try {
      await facultiesApi.delete(institutionId, id);
      setFaculties((prev) => prev.filter((fac) => fac.id !== id));
      toast.success("successfully deleted faculty");
      return true;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to delete faculty');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    faculties,
    loading,
    error,
    fetchFaculties,
    createFaculty,
    updateFaculty,
    deleteFaculty,
  };
};