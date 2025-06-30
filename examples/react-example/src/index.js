import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from 'sirbenj-jwt-auth-client';

const onLogin = async (credentials) => {
  // In a real app, you'd make an API call here
  console.log('Logging in with:', credentials);
  const accessToken = btoa(JSON.stringify({ header: { alg: 'HS256', typ: 'JWT' }, payload: { exp: Math.floor(Date.now() / 1000) + 60 * 60, name: 'Test User', roles: ['user'] } }));
  const refreshToken = btoa(JSON.stringify({ payload: { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 } }));
  return { accessToken, refreshToken };
};

const onRefresh = async (refreshToken) => {
  // In a real app, you'd make an API call here
  console.log('Refreshing token:', refreshToken);
  const accessToken = btoa(JSON.stringify({ header: { alg: 'HS256', typ: 'JWT' }, payload: { exp: Math.floor(Date.now() / 1000) + 60 * 60, name: 'Test User', roles: ['user'] } }));
  return { newAccessToken: accessToken };
};

const onVerify = async (accessToken) => {
  // In a real app, you'd make an API call here
  console.log('Verifying token:', accessToken);
  return true;
};

const authConfig = {
  onLogin,
  onRefresh,
  onVerify,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
