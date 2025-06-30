export interface JwtAuthClientOptions {
  storage?: Storage;
  accessTokenKey?: string;
  refreshTokenKey?: string;
  rolesClaim?: string;
  permissionsClaim?: string;
  onRefresh?: (refreshToken: string) => Promise<{ newAccessToken: string; newRefreshToken?: string }>;
  onLogin?: (credentials: any) => Promise<{ accessToken: string; refreshToken?: string }>;
  onVerify?: (accessToken: string) => Promise<boolean>;
}

export interface LoginCredentials {
  [key: string]: any;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface JwtPayload {
  exp?: number;
  [key: string]: any;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  userPayload: JwtPayload | null;
  accessToken: string | null;
  login: (credentials: LoginCredentials, loginUrl?: string) => Promise<boolean>;
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