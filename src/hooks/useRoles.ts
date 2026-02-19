// src/hooks/useRoles.ts

import { useState, useEffect } from 'react';
import { rolesApi } from '../api/roles.api';
import type {
  UserRole,
  CreateRolePayload,
  UpdateRolePayload,
  ApiError,
} from '../types/api.types';

export const useRoles = (userId: string | null, autoFetch = true) => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      const data = await rolesApi.getAll(userId);
      setRoles(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && userId) {
      fetchRoles();
    }
  }, [userId]);

  const createRole = async (data: CreateRolePayload): Promise<UserRole | null> => {
    if (!userId) return null;

    setLoading(true);
    setError(null);
    try {
      const role = await rolesApi.create(userId, data);
      setRoles((prev) => [...prev, role]);
      return role;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to create role');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (
    roleId: string,
    data: UpdateRolePayload
  ): Promise<UserRole | null> => {
    if (!userId) return null;

    setLoading(true);
    setError(null);
    try {
      const role = await rolesApi.update(userId, roleId, data);
      setRoles((prev) => prev.map((r) => (r.id === roleId ? role : r)));
      return role;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to update role');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteRole = async (roleId: string): Promise<boolean> => {
    if (!userId) return false;

    setLoading(true);
    setError(null);
    try {
      await rolesApi.delete(userId, roleId);
      setRoles((prev) => prev.filter((r) => r.id !== roleId));
      return true;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to delete role');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    roles,
    loading,
    error,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
  };
};