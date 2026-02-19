import { useState, useEffect } from 'react';
import { institutionsApi } from '../api/institutions.api';
import type {
  Institution,
  CreateInstitutionPayload,
  UpdateInstitutionPayload,
  ApiError,
  PaginationParams,
} from '../types/api.types';

export const useInstitutions = (
  params?: PaginationParams,
  autoFetch = true
) => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInstitutions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await institutionsApi.getAll(params);
      setInstitutions(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch institutions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchInstitutions();
    }
  }, [params?.offset, params?.limit, params?.filter]);

  const createInstitution = async (
    data: CreateInstitutionPayload
  ): Promise<Institution | null> => {
    setLoading(true);
    setError(null);
    try {
      const institution = await institutionsApi.create(data);
      setInstitutions((prev) => [...prev, institution]);
      return institution;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to create institution');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateInstitution = async (
    id: string,
    data: UpdateInstitutionPayload
  ): Promise<Institution | null> => {
    setLoading(true);
    setError(null);
    try {
      const institution = await institutionsApi.update(id, data);
      setInstitutions((prev) =>
        prev.map((inst) => (inst.id === id ? institution : inst))
      );
      return institution;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to update institution');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteInstitution = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await institutionsApi.delete(id);
      setInstitutions((prev) => prev.filter((inst) => inst.id !== id));
      return true;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to delete institution');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    institutions,
    loading,
    error,
    fetchInstitutions,
    createInstitution,
    updateInstitution,
    deleteInstitution,
  };
};