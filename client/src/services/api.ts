import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const apiClient = axios.create({ baseURL: BASE });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export interface TestCase {
  id: string;
  category: 'positive' | 'negative' | 'boundary' | 'authentication' | 'security';
  description: string;
  method: string;
  path: string;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  body: unknown | null;
  expectedStatus: number;
  expectedBodyContains: string | null;
}

export interface EndpointResult {
  endpoint: string;
  testCases: TestCase[];
}

export interface GenerateResponse {
  api: { title: string; version: string; baseUrl: string };
  strategy: string;
  totalEndpoints: number;
  results: EndpointResult[];
}

export interface ExecResult extends TestCase {
  result: {
    passed: boolean;
    actualStatus: number | null;
    expectedStatus: number;
    statusMatch: boolean;
    bodyMatch: boolean;
    duration: number;
    responseBody: string | null;
    error: string | null;
  };
}

export interface ExecuteResponse {
  summary: { total: number; passed: number; failed: number; passRate: string };
  results: ExecResult[];
}

export async function generateTests(spec: unknown, strategy: string): Promise<GenerateResponse> {
  const res = await apiClient.post(`/generate`, { spec, strategy });
  return res.data;
}

export async function executeTests(testCases: TestCase[], baseUrl: string): Promise<ExecuteResponse> {
  const res = await apiClient.post(`/execute`, { testCases, baseUrl });
  return res.data;
}