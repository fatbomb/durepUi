// src/hooks/useUser.ts

import { useState, useEffect } from 'react';
import { usersApi } from '../api/users.api';
import type { User, UpdateUserPayload, ApiError } from '../types/api.types';

export const useUser = (id: string | null, autoFetch = true) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await usersApi.getById(id);
      setUser(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && id) {
      fetchUser();
    }
  }, [id]);

  const updateUser = async (data: UpdateUserPayload): Promise<User | null> => {
    if (!id) return null;

    setLoading(true);
    setError(null);
    try {
      const updatedUser = await usersApi.update(id, data);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to update user');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (): Promise<boolean> => {
    if (!id) return false;

    setLoading(true);
    setError(null);
    try {
      await usersApi.delete(id);
      setUser(null);
      return true;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to delete user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    fetchUser,
    updateUser,
    deleteUser,
  };
};