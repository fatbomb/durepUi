// src/api/auth.api.ts

import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import { ENDPOINTS } from '../config/api.config';
import type {
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
  User,
} from '../types/api.types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.login(credentials);
    }
    
    const response = await apiClient.post<AuthResponse>(
      ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    // Store tokens in localStorage
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  },

  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.signup(credentials);
    }
    
    const response = await apiClient.post<AuthResponse>(
      ENDPOINTS.AUTH.SIGNUP,
      credentials
    );
    
    // Store tokens in localStorage
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  },

  logout: () => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      MockApiClient.logout();
      return;
    }
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  getAccessToken: (): string | null => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getAccessToken();
    }
    return localStorage.getItem('access_token');
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem('refresh_token');
  },
  
  getUser: (): User | null => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getUser();
    }
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};