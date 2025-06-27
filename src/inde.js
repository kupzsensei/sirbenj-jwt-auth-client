import { JwtAuthClient } from './JwtAuthClient.js';
import { AuthProvider, useAuth } from './react/AuthContext.js';

// Export core client for vanilla JS usage
export { JwtAuthClient };

// Export React provider and hook
export { AuthProvider, useAuth };