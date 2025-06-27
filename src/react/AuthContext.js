import React, { createContext, useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { JwtAuthClient } from '../JwtAuthClient';

const AuthContext = createContext(null);

export function AuthProvider({ children, config }) {
  const authClient = useMemo(() => new JwtAuthClient(config), [config]);

  const [accessToken, setAccessToken] = useState(authClient.getAccessToken());
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initial check on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      if (authClient.isAccessTokenExpired()) {
        const refreshToken = authClient.getRefreshToken();
        if (refreshToken) {
          setIsRefreshing(true);
          const success = await authClient.refreshAccessToken();
          if (success) {
            setAccessToken(authClient.getAccessToken());
          }
        }
      }
      setLoading(false);
      setIsRefreshing(false);
    };
    initializeAuth();
  }, [authClient]);

  const isAuthenticated = useMemo(() => !!accessToken && !authClient.isAccessTokenExpired(), [accessToken, authClient]);
  const userPayload = useMemo(() => isAuthenticated ? authClient.getPayload() : null, [isAuthenticated, authClient]);

  const login = useCallback((newAccessToken, newRefreshToken) => {
    authClient.login(newAccessToken, newRefreshToken);
    setAccessToken(newAccessToken);
  }, [authClient]);

  const logout = useCallback(() => {
    authClient.logout();
    setAccessToken(null);
  }, [authClient]);

  const refreshAccessToken = useCallback(async () => {
    setIsRefreshing(true);
    const success = await authClient.refreshAccessToken();
    if (success) {
      setAccessToken(authClient.getAccessToken());
    }
    setIsRefreshing(false);
    return success;
  }, [authClient]);

  const value = useMemo(() => ({
    isAuthenticated,
    userPayload,
    accessToken,
    login,
    logout,
    loading,
    isRefreshing,
    refreshAccessToken,
  }), [isAuthenticated, userPayload, accessToken, login, logout, loading, isRefreshing, refreshAccessToken]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}