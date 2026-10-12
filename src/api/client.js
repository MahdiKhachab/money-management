import axios from 'axios';
import { API_BASE_URL } from '../config/env';
import { clearSession, getToken } from '../auth/session';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

let onUnauthorized = () => {};

// AuthProvider registers its logout here so a 401 anywhere ends the session.
export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/auth/login');
    if (error.response?.status === 401 && !isLoginRequest) {
      clearSession();
      onUnauthorized();
    }
    return Promise.reject(error);
  }
);

// Extracts a human-readable message from an axios error.
export const getErrorMessage = (error, fallback = 'حدث خطأ غير متوقع. حاول مرة أخرى.') => {
  if (!error?.response) {
    return error?.request ? 'تعذر الاتصال بالخادم. تحقق من الاتصال وحاول مجدداً.' : fallback;
  }
  const { status, data } = error.response;
  if (status === 403) return 'ليست لديك صلاحية لتنفيذ هذا الإجراء.';
  if (status === 404) return 'العنصر المطلوب غير موجود.';
  return (typeof data === 'object' && data?.message) || fallback;
};

export default client;
