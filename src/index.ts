import { JwtAuthClient } from './JwtAuthClient';
import { AuthProvider, useAuth } from './react/AuthContext';

// Export core client for vanilla JS usage
export { JwtAuthClient };

// Export React provider and hook
export { AuthProvider, useAuth };