import { api } from '@/apis/api';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface ApiContextProviderProps {
  children: ReactNode;
}

interface ApiData {
  data: DataProperties[]
}

interface RulesData {
  data: string[]
}

interface FetchData {
  dataset: File;
  rule_name: string;
  min_support: number;
  confiance: number;
}

interface DataProperties {
  antecedents: string[],
  consequents: string[],
  confidence: number,
}

interface FetchLogin {
  email: string,
  password: string,
}

interface UserData {
  accessToken: string[],
}

interface ApiContextType {
  apiData: ApiData;
  rules: RulesData;
  fetchLogin: (data: FetchLogin) => Promise<void>
  fetchData: (data: FetchData) => Promise<void>
  fetchAssociationsRules: (data: string) => Promise<void>
  setRules: React.Dispatch<React.SetStateAction<RulesData>>;
  fetchDownloadFile: () => Promise<void>
}

const ApiContext = createContext({} as ApiContextType);

export const ApiProvider = ({ children }: ApiContextProviderProps) => {
  const [apiData, setApiData] = useState<ApiData>({ data: [] });
  const [rules, setRules] = useState<RulesData>({ data: [] });
  const [authData, setAuthData] = useState<UserData>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/rules');
        setRules(response.data);
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
    fetchData();
  }, [])

  const fetchData = async (data: FetchData) => {
    const formData = new FormData();
    formData.append('dataset', data.dataset);
    const response = await api.post('/uploads', formData, {
      params: {
        min_support: data.min_support,
        confiance: data.confiance,
        rule_name: data.rule_name
      }
    });
    if (response.data.error) throw new Error(response.data.error)
    setApiData(response.data);
  };

  const fetchAssociationsRules = async (data: string) => {
    try {
      const response = await api.get(`/uploads?rule_name=${data}`);
      setApiData(response.data);
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
    }
  };

  const fetchDownloadFile = async () => {
    try {
      await api.get('/files/download');
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
    }
    
  };

  const fetchLogin = async (data: FetchLogin) => {
    const response = await api.post('/login', data);
    if (response.data.error) throw new Error(response.data.error)
    setAuthData(response.data)
  };

  return (
    <ApiContext.Provider value={{ apiData, fetchData, rules, fetchAssociationsRules, setRules, fetchDownloadFile, fetchLogin }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi deve ser usado dentro de um ApiProvider');
  }
  return context;
};
