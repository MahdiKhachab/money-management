import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { setUnauthorizedHandler } from '../api/client';
import { login as loginRequest } from '../api/authService';
import { clearSession, decodeToken, getToken, saveSession } from './session';

const AuthContext = createContext(null);

const readSession = () => {
  const user = decodeToken(getToken());
  if (!user) clearSession();
  return user;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readSession);
  const [sessionExpired, setSessionExpired] = useState(false);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const userRef = useRef(user);
  userRef.current = user;

  const expire = useCallback(() => {
    clearSession();
    if (userRef.current) setSessionExpired(true);
    setUser(null);
  }, []);

  const login = useCallback(async (username, password) => {
    const token = await loginRequest(username, password);
    const decoded = decodeToken(token);
    if (!decoded) throw new Error('استجابة تسجيل الدخول غير صالحة.');
    saveSession(token, decoded.username);
    setSessionExpired(false);
    setUser(decoded);
    return decoded;
  }, []);

  // Any 401 from the API ends the session.
  useEffect(() => {
    setUnauthorizedHandler(expire);
    return () => setUnauthorizedHandler(() => {});
  }, [expire]);

  // Log out exactly when the token expires, even if the user is idle.
  useEffect(() => {
    if (!user?.expiresAt) return undefined;
    const timer = setTimeout(expire, Math.max(user.expiresAt - Date.now(), 0));
    return () => clearTimeout(timer);
  }, [user, expire]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'ADMIN',
      sessionExpired,
      login,
      logout,
    }),
    [user, sessionExpired, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
};
