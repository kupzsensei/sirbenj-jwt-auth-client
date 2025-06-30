import React, { createContext, useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { JwtAuthClient } from '../JwtAuthClient';
import { AuthContextType, JwtAuthClientOptions, LoginCredentials, JwtPayload } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, config }: { children: React.ReactNode; config: JwtAuthClientOptions }) {
    const authClient = useMemo(() => new JwtAuthClient(config), [config]);

    const [accessToken, setAccessToken] = useState(authClient.getAccessToken());
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    // Initial check on component mount
    useEffect(() => {
        const initializeAuth = async () => {
            let verified = false;
            if (authClient.isAccessTokenExpired()) {
                const refreshToken = authClient.getRefreshToken();
                if (refreshToken) {
                    setIsRefreshing(true);
                    const success = await authClient.refreshAccessToken();
                    if (success) {
                        setAccessToken(authClient.getAccessToken());
                        verified = await authClient.verifyToken();
                    }
                }
            } else {
                verified = await authClient.verifyToken();
            }
            setIsVerified(verified);
            setLoading(false);
            setIsRefreshing(false);
        };
        initializeAuth();
    }, [authClient]);

    const isAuthenticated = useMemo(() => !!accessToken && !authClient.isAccessTokenExpired() && isVerified, [accessToken, authClient, isVerified]);
    const userPayload = useMemo(() => isAuthenticated ? authClient.getPayload() : null, [isAuthenticated, authClient]);

    const login = useCallback(async (credentials: LoginCredentials, loginUrl?: string) => {
        setLoading(true);
        const success = await authClient.login(credentials, loginUrl);
        if (success) {
            setAccessToken(authClient.getAccessToken());
            const verified = await authClient.verifyToken();
            setIsVerified(verified);
        } else {
            setAccessToken(null);
            setIsVerified(false);
        }
        setLoading(false);
        return success;
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

    const verifyToken = useCallback(async () => {
        setLoading(true);
        const verified = await authClient.verifyToken();
        setIsVerified(verified);
        setLoading(false);
        return verified;
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
        verifyToken,
        getRoles: () => authClient.getRoles(),
        hasRole: (role) => authClient.hasRole(role),
        hasAnyRole: (roles) => authClient.hasAnyRole(roles),
        hasAllRoles: (roles) => authClient.hasAllRoles(roles),
        getPermissions: () => authClient.getPermissions(),
        hasPermission: (permission: string) => authClient.hasPermission(permission),
        hasAnyPermission: (permissions: string[]) => authClient.hasAnyPermission(permissions),
        hasAllPermissions: (permissions: string[]) => authClient.hasAllPermissions(permissions),
    }), [isAuthenticated, userPayload, accessToken, login, logout, loading, isRefreshing, refreshAccessToken, verifyToken, authClient]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}