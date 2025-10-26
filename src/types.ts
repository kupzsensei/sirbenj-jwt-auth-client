// Minimal storage contract compatible with Web Storage and custom adapters
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

// JWT payload shape with common registered claims and passthrough fields
export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number; // seconds since epoch
  nbf?: number;
  iat?: number;
  jti?: string;
  [key: string]: any;
}

export interface JwtAuthClientOptions {
  storage?: StorageLike; // defaults to localStorage when available, else in-memory
  accessTokenKey?: string;
  refreshTokenKey?: string;
  rolesClaim?: string;
  permissionsClaim?: string;
  autoRefresh?: boolean; // automatically refresh before expiry
  refreshLeewaySeconds?: number; // refresh N seconds before exp
  clockSkewSeconds?: number; // tolerate issuer clock skew
  enableStorageSync?: boolean; // listen to storage events across tabs
  
  // New declarative API configurations
  loginApiConfig?: LoginApiConfig;
  refreshApiConfig?: RefreshApiConfig;
  verifyApiConfig?: VerifyApiConfig;

  // Existing callback functions (take precedence over API configs if both are provided)
  onRefresh?: (refreshToken: string) => Promise<{ newAccessToken: string; newRefreshToken?: string }>;
  onLogin?: (credentials: any) => Promise<{ accessToken: string; refreshToken?: string }>;
  onVerify?: (accessToken: string) => Promise<boolean>;
}

export interface ApiRequestContext {
  credentials?: any;
  accessToken?: string | null;
  refreshToken?: string | null;
}

export interface LoginApiConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  responseMapping?: {
    accessToken?: string; // Path to access token in response (e.g., 'data.token')
    refreshToken?: string; // Path to refresh token in response
  };
  // Optional override to fully control the request based on credentials
  requestBuilder?: (ctx: ApiRequestContext) => { url?: string; init?: RequestInit };
}

export interface RefreshApiConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  responseMapping?: {
    newAccessToken?: string; // Path to new access token in response
    newRefreshToken?: string; // Path to new refresh token in response
  };
  // Optional override to fully control the request using refresh token
  requestBuilder?: (ctx: ApiRequestContext) => { url?: string; init?: RequestInit };
}

export interface VerifyApiConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  responseMapping?: {
    isValid?: string; // Path to boolean indicating validity (e.g., 'status.success')
  };
  // Optional override to fully control the request using access token
  requestBuilder?: (ctx: ApiRequestContext) => { url?: string; init?: RequestInit };
}

export interface LoginCredentials {
  [key: string]: any;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  apiResponse?: any; // Add this line to include the full API response
}

export interface AuthContextType {
  isAuthenticated: boolean;
  userPayload: JwtPayload | null;
  accessToken: string | null;
  login: (credentials: LoginCredentials, loginUrl?: string) => Promise<{ tokenResponse: TokenResponse, apiResponse: any } | null>;
  logout: () => void;
  loading: boolean;
  isRefreshing: boolean;
  refreshAccessToken: () => Promise<boolean>;
  verifyToken: () => Promise<boolean>;
  getAuthorizationHeader: () => Record<string, string>;
  getRoles: () => string[];
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasAllRoles: (roles: string[]) => boolean;
  getPermissions: () => string[];
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
}
