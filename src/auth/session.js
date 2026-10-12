import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const saveSession = (token, username) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USERNAME_KEY, username);
};

export const clearSession = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
  } catch {
    // storage unavailable: nothing to clear
  }
};

// Returns { username, role, expiresAt } or null when the token is missing, malformed or expired.
export const decodeToken = (token) => {
  if (!token) return null;
  try {
    const claims = jwtDecode(token);
    const expiresAt = claims.exp ? claims.exp * 1000 : null;
    if (expiresAt && expiresAt <= Date.now()) return null;
    return {
      username: claims.username || claims.sub || 'مستخدم',
      role: claims.role || 'USER',
      expiresAt,
    };
  } catch {
    return null;
  }
};
