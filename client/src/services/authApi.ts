import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

export interface AuthResponse {
  token: string;
  email: string;
}

export async function register(email: string, password: string): Promise<AuthResponse> {
  const res = await axios.post(`${BASE_URL}/auth/register`, { email, password });
  return res.data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return res.data;
}
