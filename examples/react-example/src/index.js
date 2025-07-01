import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from 'sirbenj-jwt-auth-client';

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
root.render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
