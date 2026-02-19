// src/context/AuthContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authApi } from "../api/auth.api";
import type { User, LoginCredentials, SignupCredentials } from "../types/api.types";
import { rolesApi } from "../api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signup: (credentials: SignupCredentials) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isFaculty: boolean;
  error:string|null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isFaculty, setIsFaculty] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Check for existing token on mount
  useEffect(() => {
    const storedToken = authApi.getAccessToken();
    console.log(storedToken)
    if (storedToken) {
      setToken(storedToken);
    }
    const user = authApi.getUser();
    console.log(user)
    if(user){
      console.log(user);
      setUser(user);
      fetchUserRoles(user.id)
    }
    setLoading(false);
  }, []);
  
  const fetchUserRoles = async (userId?: string) => {
    if (!userId) return;
    setLoading(true);
    try {
      const roles = await rolesApi.getAll(userId);

      for (const role of roles) {
        console.log(role)
        if (role.role === 'admin') {
          setIsAdmin(true);
        } else if (role.role === 'super-admin') {
          setIsSuperAdmin(true);
        } else if (role.role === 'faculty') {
          setIsFaculty(true);
        }
      }
    } catch (error) {
      setError(String(error))
      setIsAdmin(false);
      setIsSuperAdmin(false);
      setIsFaculty(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authApi.login(credentials);
      setUser(response.user);
      fetchUserRoles(response.user.id)
      setToken(response.access_token);
      return true;
    } catch (error) {
      setError(String(error))
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authApi.signup(credentials);
      setUser(response.user);
      setToken(response.access_token);
      return true;
    } catch (error) {
      setError(String(error))
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
      user,
      token,
      login,
      signup,
      logout,
      isAuthenticated: token? true:false,
      loading,
      isAdmin,
      isSuperAdmin,
      isFaculty,
      error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}