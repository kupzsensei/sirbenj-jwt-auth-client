export interface JwtAuthClientOptions {
  storage?: Storage;
  accessTokenKey?: string;
  refreshTokenKey?: string;
  rolesClaim?: string;
  permissionsClaim?: string;
  
  // New declarative API configurations
  loginApiConfig?: LoginApiConfig;
  refreshApiConfig?: RefreshApiConfig;
  verifyApiConfig?: VerifyApiConfig;

  // Existing callback functions (take precedence over API configs if both are provided)
  onRefresh?: (refreshToken: string) => Promise<{ newAccessToken: string; newRefreshToken?: string }>;
  onLogin?: (credentials: any) => Promise<{ accessToken: string; refreshToken?: string }>;
  onVerify?: (accessToken: string) => Promise<boolean>;
}

export interface LoginApiConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  responseMapping?: {
    accessToken?: string; // Path to access token in response (e.g., 'data.token')
    refreshToken?: string; // Path to refresh token in response
  };
}

export interface RefreshApiConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  responseMapping?: {
    newAccessToken?: string; // Path to new access token in response
    newRefreshToken?: string; // Path to new refresh token in response
  };
}

export interface VerifyApiConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  responseMapping?: {
    isValid?: string; // Path to boolean indicating validity (e.g., 'status.success')
  };
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
  getRoles: () => string[];
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasAllRoles: (roles: string[]) => boolean;
  getPermissions: () => string[];
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
}
