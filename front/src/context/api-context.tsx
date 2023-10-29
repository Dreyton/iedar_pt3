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
  id: string,
  rule_name: string,
  antecedents: string[],
  consequents: string[],
  confidence: number,
}

interface ApiContextType {
  apiData: ApiData;
  rules: RulesData;
  fetchData: (data: FetchData) => Promise<void>
  fetchAssociationsRules: (data: string) => Promise<void>
  setRules: React.Dispatch<React.SetStateAction<RulesData>>;
  fetchDownloadFile: () => Promise<void>
}

const ApiContext = createContext({} as ApiContextType);

export const ApiProvider = ({ children }: ApiContextProviderProps) => {
  const [apiData, setApiData] = useState<ApiData>({ data: [] });
  const [rules, setRules] = useState<RulesData>({ data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await api.get(`/associations`);
          setApiData({
            data: response.data
          });
      } catch (error: any) {
        console.log('Erro ao buscar regras:', error.message);
        // throw new Error(error.message);
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

  const fetchAssociationsRules = async (rule_name: string) => {
    try {
      const response = await api.get('/associations', {
        params: {
          rule_name
        }
      });
      setApiData({
        data: response.data
      });
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

  return (
    <ApiContext.Provider value={{ apiData, fetchData, rules, fetchAssociationsRules, setRules, fetchDownloadFile }}>
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
