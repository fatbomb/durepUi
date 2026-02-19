// src/hooks/useAuth.ts

import { useState } from 'react';
import { authApi } from '../api/auth.api';
import type { LoginCredentials, SignupCredentials, AuthResponse, ApiError } from '../types/api.types';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  

  const login = async (credentials: LoginCredentials): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.login(credentials);
      return response;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Login failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.signup(credentials);
      return response;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Signup failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authApi.logout();
  };

  const isAuthenticated = (): boolean => {
    return !!authApi.getAccessToken();
  };

  return {
    login,
    signup,
    logout,
    isAuthenticated,
    loading,
    error,
  };
};