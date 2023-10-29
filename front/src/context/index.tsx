import React, { ReactNode } from 'react';
import { ApiProvider } from './api-context';
import { AuthProvider } from './auth-context';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }:AppProviderProps) => (
  <AuthProvider>
    <ApiProvider>{children}</ApiProvider>
  </AuthProvider>
);

export default AppProvider;
