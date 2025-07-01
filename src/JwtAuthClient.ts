import { JwtAuthClientOptions, LoginCredentials, JwtPayload, TokenResponse } from './types';

/**
 * @class JwtAuthClient
 * @description A client for handling JWT authentication.
 */
export class JwtAuthClient {
    private storage: Storage;
    private accessTokenKey: string;
    private refreshTokenKey: string;
    private rolesClaim: string;
    private permissionsClaim: string;
    private onRefresh: JwtAuthClientOptions['onRefresh'];
    private onLogin: JwtAuthClientOptions['onLogin'];
    private onVerify: JwtAuthClientOptions['onVerify'];
    private loginApiConfig?: JwtAuthClientOptions['loginApiConfig'];
    private refreshApiConfig?: JwtAuthClientOptions['refreshApiConfig'];
    private verifyApiConfig?: JwtAuthClientOptions['verifyApiConfig'];

    /**
     * @constructor
     * @param {JwtAuthClientOptions} [options] - The options for the client.
     */
    constructor(options: JwtAuthClientOptions = {}) {
        this.storage = options.storage || window.localStorage;
        this.accessTokenKey = options.accessTokenKey || 'jwt_access_token';
        this.refreshTokenKey = options.refreshTokenKey || 'jwt_refresh_token';
        this.rolesClaim = options.rolesClaim || 'roles';
        this.permissionsClaim = options.permissionsClaim || 'permissions';
        this.onRefresh = options.onRefresh;
        this.onLogin = options.onLogin;
        this.onVerify = options.onVerify;
        this.loginApiConfig = options.loginApiConfig;
        this.refreshApiConfig = options.refreshApiConfig;
        this.verifyApiConfig = options.verifyApiConfig;
    }

    /**
     * Saves the tokens to the configured storage.
     * @param {string} accessToken - The access JWT string.
     * @param {string} [refreshToken] - The optional refresh JWT string.
     */
    public setTokens(accessToken: string, refreshToken?: string): void {
        if (typeof accessToken !== 'string' || accessToken.split('.').length !== 3) {
            console.error('Invalid Access Token provided to setTokens method.');
            return;
        }
        this.storage.setItem(this.accessTokenKey, accessToken);
        if (refreshToken) {
            this.storage.setItem(this.refreshTokenKey, refreshToken);
        }
    }

    /**
     * Handles the login process by calling the provided onLogin function or a default fetch.
     * @param {object} credentials - User credentials (e.g., { username, password }).
     * @param {string} [loginUrl] - The URL for the login API endpoint. Overrides the one provided in options.
     * @returns {Promise<{ tokenResponse: TokenResponse, apiResponse: any } | null>} The token response data and the full API response if login was successful, null otherwise.
     */
    public async login(credentials: LoginCredentials, loginUrl?: string): Promise<{ tokenResponse: TokenResponse, apiResponse: any } | null> {
        const finalLoginUrl = loginUrl || this.loginApiConfig?.url;

        if (!this.onLogin && !finalLoginUrl) {
            console.error('Neither onLogin function nor loginUrl/loginApiConfig provided. Cannot perform login.');
            return null;
        }

        try {
            let tokenData: TokenResponse;
            let rawResponseData: any;

            if (this.onLogin) {
                tokenData = await this.onLogin(credentials);
                // If onLogin is used, we don't have the raw API response unless the user provides it.
                // For now, we'll just return the tokenData as the apiResponse.
                rawResponseData = tokenData;
            } else if (finalLoginUrl) {
                const response = await fetch(finalLoginUrl, {
                    method: this.loginApiConfig?.method || 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...this.loginApiConfig?.headers,
                    },
                    body: JSON.stringify(credentials),
                });

                if (!response.ok) {
                    throw new Error(`Login failed with status: ${response.status}`);
                }
                rawResponseData = await response.json();
                const accessToken = this.getDeepValue(rawResponseData, this.loginApiConfig?.responseMapping?.accessToken);
                const refreshToken = this.getDeepValue(rawResponseData, this.loginApiConfig?.responseMapping?.refreshToken);

                if (!accessToken) {
                    throw new Error('Login response did not contain an access token.');
                }
                tokenData = { accessToken, refreshToken };
            } else {
                throw new Error('Login function or URL/API config not configured.');
            }

            this.setTokens(tokenData.accessToken, tokenData.refreshToken);
            return { tokenResponse: tokenData, apiResponse: rawResponseData };
        } catch (error) {
            console.error('Login failed:', error);
            this.logout(); // Clear any existing tokens on login failure
            return null;
        }
    }

    /**
     * Verifies the access token with the backend using the provided onVerify function or verifyApiConfig.
     * @returns {Promise<boolean>} True if token is valid, false otherwise.
     */
    public async verifyToken(): Promise<boolean> {
        const accessToken = this.getAccessToken();
        if (!accessToken) {
            return false;
        }

        if (this.onVerify) {
            try {
                const isValid = await this.onVerify(accessToken);
                if (!isValid) {
                    console.warn('Backend verification failed for access token.');
                    this.logout(); // Invalidate local session if backend says token is invalid
                }
                return isValid;
            } catch (error) {
                console.error('Error during token verification:', error);
                this.logout(); // Logout on verification error
                return false;
            }
        } else if (this.verifyApiConfig) {
            try {
                const response = await fetch(this.verifyApiConfig.url, {
                    method: this.verifyApiConfig.method || 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        ...this.verifyApiConfig.headers,
                    },
                });

                const rawResponseData = await response.json();
                const isValid = this.getDeepValue(rawResponseData, this.verifyApiConfig.responseMapping?.isValid);

                if (!isValid) {
                    console.warn('Backend verification failed for access token.');
                    this.logout();
                }
                return isValid;
            } catch (error) {
                console.error('Error during token verification:', error);
                this.logout();
                return false;
            }
        } else {
            console.warn('onVerify function or verifyApiConfig not configured. Assuming token is valid based on local expiration.');
            return !this.isAccessTokenExpired();
        }
    }

    /**
     * Retrieves roles from the decoded access token payload.
     * @returns {string[]} An array of roles or an empty array if not found.
     */
    public getRoles(): string[] {
        const payload = this.getPayload();
        if (payload && Array.isArray(payload[this.rolesClaim])) {
            return payload[this.rolesClaim];
        }
        return [];
    }

    /**
     * Checks if the user has a specific role.
     * @param {string} role - The role to check for.
     * @returns {boolean} True if the user has the role, false otherwise.
     */
    public hasRole(role: string): boolean {
        return this.getRoles().includes(role);
    }

    /**
     * Checks if the user has any of the specified roles.
     * @param {string[]} roles - An array of roles to check for.
     * @returns {boolean} True if the user has at least one of the roles, false otherwise.
     */
    public hasAnyRole(roles: string[]): boolean {
        const userRoles = this.getRoles();
        return roles.some(role => userRoles.includes(role));
    }

    /**
     * Checks if the user has all of the specified roles.
     * @param {string[]} roles - An array of roles to check for.
     * @returns {boolean} True if the user has all of the roles, false otherwise.
     */
    public hasAllRoles(roles: string[]): boolean {
        const userRoles = this.getRoles();
        return roles.every(role => userRoles.includes(role));
    }

    /**
     * Retrieves permissions from the decoded access token payload.
     * @returns {string[]} An array of permissions or an empty array if not found.
     */
    public getPermissions(): string[] {
        const payload = this.getPayload();
        if (payload && Array.isArray(payload[this.permissionsClaim])) {
            return payload[this.permissionsClaim] as string[];
        }
        return [];
    }

    /**
     * Checks if the user has a specific permission.
     * @param {string} permission - The permission to check for.
     * @returns {boolean} True if the user has the permission, false otherwise.
     */
    public hasPermission(permission: string): boolean {
        return this.getPermissions().includes(permission);
    }

    /**
     * Checks if the user has any of the specified permissions.
     * @param {string[]} permissions - An array of permissions to check for.
     * @returns {boolean} True if the user has at least one of the permissions, false otherwise.
     */
    public hasAnyPermission(permissions: string[]): boolean {
        const userPermissions = this.getPermissions();
        return permissions.some((permission: string) => userPermissions.includes(permission));
    }

    /**
     * Checks if the user has all of the specified permissions.
     * @param {string[]} permissions - An array of permissions to check for.
     * @returns {boolean} True if the user has all of the permissions, false otherwise.
     */
    public hasAllPermissions(permissions: string[]): boolean {
        const userPermissions = this.getPermissions();
        return permissions.every((permission: string) => userPermissions.includes(permission));
    }

    /**
     * Removes tokens from storage.
     */
    public logout(): void {
        this.storage.removeItem(this.accessTokenKey);
        this.storage.removeItem(this.refreshTokenKey);
    }

    /**
     * Retrieves the raw access token from storage.
     * @returns {string|null} The access token string or null if not found.
     */
    public getAccessToken(): string | null {
        return this.storage.getItem(this.accessTokenKey);
    }

    /**
     * Retrieves the raw refresh token from storage.
     * @returns {string|null} The refresh token string or null if not found.
     */
    public getRefreshToken(): string | null {
        return this.storage.getItem(this.refreshTokenKey);
    }

    /**
     * Decodes the access token payload.
     * @returns {object|null} The decoded payload object or null if token is invalid/missing.
     */
    public getPayload(): JwtPayload | null {
        const token = this.getAccessToken();
        if (!token) return null;

        try {
            const payloadBase64 = token.split('.')[1];
            const decodedJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
            return JSON.parse(decodedJson);
        } catch (error) {
            console.error('Failed to decode JWT payload:', error);
            return null;
        }
    }

    /**
     * Checks if the access token is expired.
     * @returns {boolean} True if the token is expired or doesn't exist.
     */
    public isAccessTokenExpired(): boolean {
        const payload = this.getPayload();
        if (!payload || typeof payload.exp !== 'number') {
            return true;
        }
        const nowInSeconds = Math.floor(Date.now() / 1000);
        return nowInSeconds > payload.exp;
    }

    /**
     * Checks if a valid, non-expired access token exists.
     * @returns {boolean} True if authenticated, false otherwise.
     */
    public isAuthenticated(): boolean {
        return !this.isAccessTokenExpired();
    }

    /**
     * Attempts to refresh the access token using the stored refresh token or refreshApiConfig.
     * @returns {Promise<boolean>} True if refresh was successful, false otherwise.
     */
    public async refreshAccessToken(): Promise<boolean> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            console.log('No refresh token available.');
            return false;
        }

        if (this.onRefresh) {
            try {
                const { newAccessToken, newRefreshToken } = await this.onRefresh(refreshToken);
                if (!newAccessToken) {
                    throw new Error("Refresh call did not return a new access token.");
                }
                this.setTokens(newAccessToken, newRefreshToken); // Store new tokens
                return true;
            } catch (error: any) {
                console.error('Failed to refresh token:', error);
                this.logout();
                return false;
            }
        } else if (this.refreshApiConfig) {
            try {
                const response = await fetch(this.refreshApiConfig.url, {
                    method: this.refreshApiConfig.method || 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...this.refreshApiConfig.headers,
                    },
                    body: JSON.stringify({ refreshToken }),
                });

                if (!response.ok) {
                    throw new Error(`Refresh failed with status: ${response.status}`);
                }

                const responseData = await response.json();
                const newAccessToken = this.getDeepValue(responseData, this.refreshApiConfig.responseMapping?.newAccessToken);
                const newRefreshToken = this.getDeepValue(responseData, this.refreshApiConfig.responseMapping?.newRefreshToken);

                if (!newAccessToken) {
                    throw new Error("Refresh call did not return a new access token.");
                }
                this.setTokens(newAccessToken, newRefreshToken); // Store new tokens
                return true;
            } catch (error) {
                console.error('Failed to refresh token:', error);
                this.logout();
                return false;
            }
        } else {
            console.error('onRefresh function or refreshApiConfig not configured. Cannot refresh token.');
            return false;
        }
    }

    /**
     * Safely extracts a value from an object using a dot-notation path.
     * @param obj The object to extract from.
     * @param path The dot-notation path (e.g., 'data.user.id').
     * @returns The extracted value or undefined if not found.
     */
    private getDeepValue(obj: any, path?: string): any {
        if (!path || !obj) return undefined;
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }
}