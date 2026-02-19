// src/hooks/useUsers.ts

import { useState, useEffect } from 'react';
import { usersApi } from '../api/users.api';
import type {
  User,
  CreateUserPayload,
  UpdateUserPayload,
  UsersQueryParams,
  ApiError,
} from '../types/api.types';

export const useUsers = (params?: UsersQueryParams, autoFetch = true) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await usersApi.getAll(params);
      setUsers(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchUsers();
    }
  }, [params?.offset, params?.limit, params?.filter]);

  const createUser = async (data: CreateUserPayload): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const user = await usersApi.create(data);
      setUsers((prev) => [...prev, user]);
      return user;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to create user');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, data: UpdateUserPayload): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const user = await usersApi.update(id, data);
      setUsers((prev) => prev.map((u) => (u.id === id ? user : u)));
      return user;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to update user');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await usersApi.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
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
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};