import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from 'sirbenj-jwt-auth-client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RequireAuth, RequirePermissions } from 'sirbenj-jwt-auth-client';
import { Home, LoginPage, Dashboard, Forbidden } from './App';

const authConfig = {
  loginApiConfig: {
    url: 'https://your-api.com/auth/login',
    method: 'POST',
    responseMapping: {
      accessToken: 'data.accessToken',
      refreshToken: 'data.refreshToken',
    },
  },
  refreshApiConfig: {
    url: 'https://your-api.com/auth/refresh',
    method: 'POST',
    responseMapping: {
      newAccessToken: 'data.accessToken',
      newRefreshToken: 'data.refreshToken',
    },
  },
  verifyApiConfig: {
    url: 'https://your-api.com/auth/verify',
    method: 'GET',
    responseMapping: {
      isValid: 'status.success',
    },
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <LoginPage /> },
  {
    path: '/dashboard',
    element: (
      <RequireAuth fallback={<Navigate to="/login" replace />}> 
        <RequirePermissions anyOf={["user:read"]} fallback={<Navigate to="/forbidden" replace />}> 
          <Dashboard />
        </RequirePermissions>
      </RequireAuth>
    ),
  },
  { path: '/forbidden', element: <Forbidden /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

root.render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
