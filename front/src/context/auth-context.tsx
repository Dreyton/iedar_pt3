import { api } from '@/apis/api';
import React, { useState, useContext, createContext, ReactNode } from 'react';


interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthProperties {
  accessToken: string;
}

interface LoginProperties {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(data: LoginProperties): Promise<void>;
  accessToken?: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [data, setData] = useState<AuthProperties>(() => {
    if (typeof window === 'undefined') return {} as AuthProperties;
    const accessToken = localStorage.getItem('@app:token');
    if (accessToken) {
      api.defaults.headers.authorization = `Bearer ${accessToken}`;
      return { accessToken };
    }
    return {} as AuthProperties;
  });

  const signIn = async (data: LoginProperties) => {
    const response = await api.post('login', data);
    if (response.data.error) throw new Error(response.data.error)
    const accessToken = response.data.data;
    localStorage.setItem('@app:token', accessToken);
    api.defaults.headers.authorization = `Bearer ${accessToken}`;
    setData({ accessToken });
  };

  return (
    <AuthContext.Provider value={{ signIn, accessToken: data.accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
