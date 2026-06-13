const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

interface Profile {
  id: number;
  email: string;
  full_name: string | null;
  avatar: string | null;
}

export const profileApi = {
  getProfile: async (token: string): Promise<Profile> => {
    const response = await fetch(`${API_BASE}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },

  updateProfile: async (token: string, data: { full_name?: string; avatar?: string }): Promise<Profile> => {
    const response = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },
};
