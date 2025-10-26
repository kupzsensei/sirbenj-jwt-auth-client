import { JwtAuthClient } from './JwtAuthClient';
import { AuthProvider, useAuth } from './react/AuthContext';
import { AuthGate, RequireAuth, RequirePermissions } from './react/Guards';
import { useAuthFetch } from './react/useAuthFetch';
import { memoryStorage, safeWebStorage } from './storage';
import { createAuthFetch, withAuthHeaders } from './utils';

// Export core client for vanilla JS usage
export { JwtAuthClient };

// Export React provider and hook
export { AuthProvider, useAuth };

// Export React helpers
export { AuthGate, RequireAuth, RequirePermissions, useAuthFetch };

// Export fetch helpers
export { createAuthFetch, withAuthHeaders };

// Export storage helpers
export { memoryStorage, safeWebStorage };

// Query helpers are exported via subpath: 'sirbenj-jwt-auth-client/query'
