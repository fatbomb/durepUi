// src/config/api.config.ts

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  TIMEOUT: 10000,
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  USERS: {
    BASE: '/api/users',
    BY_ID: (id: string) => `/api/users/${id}`,
  },
  ROLES: {
    BASE: (userId: string) => `/api/users/${userId}/roles`,
    BY_ID: (userId: string, roleId: string) => `/api/users/${userId}/roles/${roleId}`,
  },
  INSTITUTIONS: {
    BASE: '/api/institutions',
    BY_ID: (id: string) => `/api/institutions/${id}`,
  },
  
  FACULTIES: {
    BASE: (institutionId: string) => 
      `/api/institutions/${institutionId}/faculties`,
    BY_ID: (institutionId: string, id: string) => 
      `/api/institutions/${institutionId}/faculties/${id}`,
  },
   DEPARTMENTS: {
    BASE: (institutionId: string) => `/api/institutions/${institutionId}/departments`,
    BY_ID: (institutionId: string, id: string) => `/api/institutions/${institutionId}/departments/${id}`,
  },
  
  PROGRAMS: {
    BASE: (departmentId: string) => `/api/departments/${departmentId}/programs`,
    BY_ID: (departmentId: string, id: string) => `/api/departments/${departmentId}/programs/${id}`,
  },
  
  COURSES: {
    BASE: '/api/courses',
    BY_ID: (id: string) => `/api/courses/${id}`,
  },
  
  PROGRAM_COURSES: {
    BASE: '/api/program_courses',
    BY_ID: (id: string) => `/api/program_courses/${id}`,
  },
} as const;