import React from 'react';
import { useAuth } from './AuthContext';

export function AuthGate({ children, loadingFallback = null }: { children: React.ReactNode; loadingFallback?: React.ReactNode }) {
  const { loading } = useAuth();
  if (loading) return <>{loadingFallback}</>;
  return <>{children}</>;
}

export function RequireAuth({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <>{fallback}</>;
  return <>{children}</>;
}

export function RequirePermissions({
  children,
  anyOf,
  allOf,
  fallback = null,
}: {
  children: React.ReactNode;
  anyOf?: string[];
  allOf?: string[];
  fallback?: React.ReactNode;
}) {
  const { hasAnyPermission, hasAllPermissions } = useAuth();
  let allowed = true;
  if (anyOf && anyOf.length > 0) allowed = allowed && hasAnyPermission(anyOf);
  if (allOf && allOf.length > 0) allowed = allowed && hasAllPermissions(allOf);
  if (!allowed) return <>{fallback}</>;
  return <>{children}</>;
}

