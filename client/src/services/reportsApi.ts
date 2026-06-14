import axios from 'axios';
import { Report } from './reporter';

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const apiClient = axios.create({ baseURL: BASE });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface SavedReportSummary {
  id: number;
  title: string;
  version: string;
  base_url: string;
  strategy: string;
  pass_rate: string;
  total: number;
  passed: number;
  failed: number;
  created_at: string;
}

export async function saveReport(report: Report): Promise<{ id: number }> {
  const res = await apiClient.post('/reports', { report });
  return res.data;
}

export async function listReports(): Promise<SavedReportSummary[]> {
  const res = await apiClient.get('/reports');
  return res.data.reports;
}

export async function getReport(id: number): Promise<Report> {
  const res = await apiClient.get(`/reports/${id}`);
  return res.data.report;
}

export async function deleteReport(id: number): Promise<void> {
  await apiClient.delete(`/reports/${id}`);
}
