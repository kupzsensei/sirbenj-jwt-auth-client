export class JwtAuthClient {
    constructor(options = {}) {
      this.storage = options.storage || window.localStorage;
      this.accessTokenKey = options.accessTokenKey || 'jwt_access_token';
      this.refreshTokenKey = options.refreshTokenKey || 'jwt_refresh_token';
      this.onRefresh = options.onRefresh || null; // User-provided function to call refresh API
    }
  
    /**
     * Saves the tokens to the configured storage.
     * @param {string} accessToken - The access JWT string.
     * @param {string} [refreshToken] - The optional refresh JWT string.
     */
    login(accessToken, refreshToken) {
      if (typeof accessToken !== 'string' || accessToken.split('.').length !== 3) {
        console.error('Invalid Access Token provided to login method.');
        return;
      }
      this.storage.setItem(this.accessTokenKey, accessToken);
      if (refreshToken) {
        this.storage.setItem(this.refreshTokenKey, refreshToken);
      }
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
    isAuthenticated() {
      return !this.isAccessTokenExpired();
    }
  
    /**
     * Attempts to refresh the access token using the stored refresh token.
     * @returns {Promise<boolean>} True if refresh was successful, false otherwise.
     */
    async refreshAccessToken() {
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
        this.login(newAccessToken, newRefreshToken); // Store new tokens
        return true;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        // If refresh fails (e.g., refresh token is also expired), log the user out.
        this.logout();
        return false;
      }
    }
  }