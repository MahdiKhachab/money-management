import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext';
import { ToastProvider } from '../components/ui';
import { AppRoutes } from '../App';

const base64url = (obj) => btoa(JSON.stringify(obj)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');

// Unsigned JWT; the frontend only decodes it (the backend verifies signatures).
export const makeToken = ({ sub = 'tester', role = 'ADMIN', expiresInSec = 3600 } = {}) =>
  `${base64url({ alg: 'HS256' })}.${base64url({ sub, role, exp: Math.floor(Date.now() / 1000) + expiresInSec })}.sig`;

export const loginAs = (options) => localStorage.setItem('token', makeToken(options));

export const renderApp = (route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ToastProvider>
    </MemoryRouter>
  );
