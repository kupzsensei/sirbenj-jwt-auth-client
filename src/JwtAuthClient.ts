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
    }

    /**
     * Saves the tokens to the configured storage.
     * @param {string} accessToken - The access JWT string.
     * @param {string} [refreshToken] - The optional refresh JWT string.
     */
    setTokens(accessToken: string, refreshToken?: string) {
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
     * @param {string} loginUrl - The URL for the login API endpoint.
     * @returns {Promise<boolean>} True if login was successful, false otherwise.
     */
    async login(credentials: LoginCredentials, loginUrl?: string): Promise<boolean> {
        if (!this.onLogin && !loginUrl) {
            console.error('Neither onLogin function nor loginUrl provided. Cannot perform login.');
            return false;
        }

        try {
            let responseData;
            if (this.onLogin) {
                responseData = await this.onLogin(credentials);
            } else {
                if (!loginUrl) {
                    throw new Error('loginUrl must be provided if onLogin function is not configured.');
                }
                const response = await fetch(loginUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                });

                if (!response.ok) {
                    throw new Error(`Login failed with status: ${response.status}`);
                }
                responseData = await response.json();
            }

            const { accessToken, refreshToken } = responseData;
            if (!accessToken) {
                throw new Error('Login response did not contain an access token.');
            }

            this.setTokens(accessToken, refreshToken);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            this.logout(); // Clear any existing tokens on login failure
            return false;
        }
    }

    /**
     * Verifies the access token with the backend using the provided onVerify function.
     * @returns {Promise<boolean>} True if token is valid, false otherwise.
     */
    async verifyToken(): Promise<boolean> {
        if (!this.onVerify || typeof this.onVerify !== 'function') {
            console.warn('onVerify function not configured. Cannot verify token with backend.');
            return true; // Assume valid if no verification function is provided
        }

        const accessToken = this.getAccessToken();
        if (!accessToken) {
            return false;
        }

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
    }

    /**
     * Retrieves roles from the decoded access token payload.
     * @returns {string[]} An array of roles or an empty array if not found.
     */
    getRoles() {
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
    hasRole(role: string) {
        return this.getRoles().includes(role);
    }

    /**
     * Checks if the user has any of the specified roles.
     * @param {string[]} roles - An array of roles to check for.
     * @returns {boolean} True if the user has at least one of the roles, false otherwise.
     */
    hasAnyRole(roles: string[]) {
        const userRoles = this.getRoles();
        return roles.some(role => userRoles.includes(role));
    }

    /**
     * Checks if the user has all of the specified roles.
     * @param {string[]} roles - An array of roles to check for.
     * @returns {boolean} True if the user has all of the roles, false otherwise.
     */
    hasAllRoles(roles: string[]) {
        const userRoles = this.getRoles();
        return roles.every(role => userRoles.includes(role));
    }

    /**
     * Retrieves permissions from the decoded access token payload.
     * @returns {string[]} An array of permissions or an empty array if not found.
     */
    getPermissions(): string[] {
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
    hasPermission(permission: string): boolean {
        return this.getPermissions().includes(permission);
    }

    /**
     * Checks if the user has any of the specified permissions.
     * @param {string[]} permissions - An array of permissions to check for.
     * @returns {boolean} True if the user has at least one of the permissions, false otherwise.
     */
    hasAnyPermission(permissions: string[]): boolean {
        const userPermissions = this.getPermissions();
        return permissions.some((permission: string) => userPermissions.includes(permission));
    }

    /**
     * Checks if the user has all of the specified permissions.
     * @param {string[]} permissions - An array of permissions to check for.
     * @returns {boolean} True if the user has all of the permissions, false otherwise.
     */
    hasAllPermissions(permissions: string[]): boolean {
        const userPermissions = this.getPermissions();
        return permissions.every((permission: string) => userPermissions.includes(permission));
    }

    /**
     * Removes tokens from storage.
     */
    logout() {
        this.storage.removeItem(this.accessTokenKey);
        this.storage.removeItem(this.refreshTokenKey);
    }

    /**
     * Retrieves the raw access token from storage.
     * @returns {string|null} The access token string or null if not found.
     */
    getAccessToken() {
        return this.storage.getItem(this.accessTokenKey);
    }

    /**
     * Retrieves the raw refresh token from storage.
     * @returns {string|null} The refresh token string or null if not found.
     */
    getRefreshToken() {
        return this.storage.getItem(this.refreshTokenKey);
    }

    /**
     * Decodes the access token payload.
     * @returns {object|null} The decoded payload object or null if token is invalid/missing.
     */
    getPayload() {
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
    isAccessTokenExpired() {
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
    isAuthenticated(): boolean {
        return !this.isAccessTokenExpired();
    }

    /**
     * Attempts to refresh the access token using the stored refresh token.
     * @returns {Promise<boolean>} True if refresh was successful, false otherwise.
     */
    async refreshAccessToken(): Promise<boolean> {
        if (!this.onRefresh || typeof this.onRefresh !== 'function') {
            console.error('onRefresh function not configured. Cannot refresh token.');
            return false;
        }

        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            console.log('No refresh token available.');
            return false;
        }

        try {
            const { newAccessToken, newRefreshToken } = await this.onRefresh(refreshToken);
            if (!newAccessToken) {
                throw new Error("Refresh call did not return a new access token.");
            }
            this.setTokens(newAccessToken, newRefreshToken); // Store new tokens
            return true;
        } catch (error: any) {
            console.error('Failed to refresh token:', error);
            // If refresh fails (e.g., refresh token is also expired), log the user out.
            this.logout();
            return false;
        }
    }
}