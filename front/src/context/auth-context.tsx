import { api } from '@/apis/api';
import React, { useState, useContext, createContext, ReactNode } from 'react';


interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthProperties {
  accessToken: string;
  rule_name?: string;
}

interface LoginProperties {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(data: LoginProperties): Promise<void>;
  accessToken?: string;
  rule_name?: string;
  setRuleName: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [ruleName, setRuleName] = useState<string>('');

  const [data, setData] = useState<AuthProperties>(() => {
    if (typeof window === 'undefined') return {} as AuthProperties;
    const accessToken = localStorage.getItem('@app:token');
    const rule_name = localStorage.getItem('@app:rule_name') ?? undefined;
    if (accessToken) {
      setRuleName(rule_name || '');
      api.defaults.headers.authorization = `Bearer ${accessToken}`;
      return { accessToken, rule_name };
    }
    return {} as AuthProperties;
  });

  const signIn = async (data: LoginProperties) => {
    const response = await api.post('login', data);
    if (response.data.error) throw new Error(response.data.error)
    const accessToken = response.data.data.access_token;
    const rule_name = response.data.data.rule_name;
    localStorage.setItem('@app:token', accessToken);
    localStorage.setItem('@app:rule_name', rule_name);
    api.defaults.headers.authorization = `Bearer ${accessToken}`;
    setRuleName(rule_name || '');
    setData({ accessToken, rule_name });
  };

  return (
    <AuthContext.Provider value={{ signIn, accessToken: data.accessToken, rule_name: ruleName, setRuleName }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
