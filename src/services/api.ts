import axios from 'axios';
import { AuthResponse, LoginData, RegisterData, User, Quest, Achievement, ActivityLog } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  register: (data: RegisterData) => api.post<{ message: string; user: User }>('/auth/register', data),
  login: (data: LoginData) => api.post<AuthResponse>('/auth/login', data),
  me: () => api.get<User>('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Users
export const usersAPI = {
  getProfile: () => api.get<User>('/users/me'),
};

// Stats
export const statsAPI = {
  get: () => api.get('/stats'),
  increase: (stat: string, points: number) => api.put('/stats/increase', { stat, points }),
};

// Quests
export const questsAPI = {
  getAll: () => api.get<Quest[]>('/quests'),
  create: (data: any) => api.post<Quest>('/quests', data),
  updateProgress: (id: string, progress: number) => api.put(`/quests/${id}/progress`, { progress }),
  complete: (id: string) => api.put(`/quests/${id}/complete`),
  applyPenalty: (id: string) => api.put(`/quests/${id}/penalty`),
  delete: (id: string) => api.delete(`/quests/${id}`),
};

// Achievements
export const achievementsAPI = {
  getAll: () => api.get<Achievement[]>('/achievements'),
  check: () => api.post('/achievements/check'),
};

// Activity Log
export const activityLogAPI = {
  getAll: (limit?: number) => api.get<ActivityLog[]>('/activity-log', { params: { limit } }),
  getStats: () => api.get('/activity-log/stats'),
};

export default api;