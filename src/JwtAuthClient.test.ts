import { JwtAuthClient } from './JwtAuthClient';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Helper to create a mock JWT
const createMockJwt = (payload: object) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  return `${encodedHeader}.${encodedPayload}.signature`;
};

describe('JwtAuthClient', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.restoreAllMocks();
  });

  it('should instantiate without errors', () => {
    const client = new JwtAuthClient();
    expect(client).toBeInstanceOf(JwtAuthClient);
  });

  describe('Token Management', () => {
    it('should set and get access and refresh tokens', () => {
      const client = new JwtAuthClient();
      const accessToken = createMockJwt({ sub: '123' });
      const refreshToken = createMockJwt({ sub: '456' });

      client.setTokens(accessToken, refreshToken);

      expect(client.getAccessToken()).toBe(accessToken);
      expect(client.getRefreshToken()).toBe(refreshToken);
    });

    it('should clear tokens on logout', () => {
      const client = new JwtAuthClient();
      const accessToken = createMockJwt({ sub: '123' });
      const refreshToken = createMockJwt({ sub: '456' });

      client.setTokens(accessToken, refreshToken);
      client.logout();

      expect(client.getAccessToken()).toBeNull();
      expect(client.getRefreshToken()).toBeNull();
    });
  });

  describe('Authentication', () => {
    it('should be authenticated if token is not expired', () => {
      const client = new JwtAuthClient();
      const accessToken = createMockJwt({ exp: Date.now() / 1000 + 3600 }); // Expires in 1 hour
      client.setTokens(accessToken);
      expect(client.isAuthenticated()).toBe(true);
    });

    it('should not be authenticated if token is expired', () => {
      const client = new JwtAuthClient();
      const accessToken = createMockJwt({ exp: Date.now() / 1000 - 3600 }); // Expired 1 hour ago
      client.setTokens(accessToken);
      expect(client.isAuthenticated()).toBe(false);
    });
  });

  describe('Roles and Permissions', () => {
    it('should correctly handle roles', () => {
      const client = new JwtAuthClient();
      const accessToken = createMockJwt({ roles: ['admin', 'user'] });
      client.setTokens(accessToken);

      expect(client.getRoles()).toEqual(['admin', 'user']);
      expect(client.hasRole('admin')).toBe(true);
      expect(client.hasRole('moderator')).toBe(false);
      expect(client.hasAnyRole(['admin', 'moderator'])).toBe(true);
      expect(client.hasAllRoles(['admin', 'user'])).toBe(true);
      expect(client.hasAllRoles(['admin', 'moderator'])).toBe(false);
    });

    it('should correctly handle permissions', () => {
      const client = new JwtAuthClient();
      const accessToken = createMockJwt({ permissions: ['read', 'write'] });
      client.setTokens(accessToken);

      expect(client.getPermissions()).toEqual(['read', 'write']);
      expect(client.hasPermission('read')).toBe(true);
      expect(client.hasPermission('delete')).toBe(false);
      expect(client.hasAnyPermission(['read', 'delete'])).toBe(true);
      expect(client.hasAllPermissions(['read', 'write'])).toBe(true);
      expect(client.hasAllPermissions(['read', 'delete'])).toBe(false);
    });
  });

  describe('Login', () => {
    it('should login with onLogin', async () => {
      const onLogin = jest.fn().mockResolvedValue({ accessToken: createMockJwt({}), refreshToken: createMockJwt({}) });
      const client = new JwtAuthClient({ onLogin });

      const success = await client.login({ username: 'test', password: 'password' });

      expect(success).toBe(true);
      expect(onLogin).toHaveBeenCalledWith({ username: 'test', password: 'password' });
      expect(client.getAccessToken()).not.toBeNull();
    });
  });

  describe('Refresh', () => {
    it('should refresh token with onRefresh', async () => {
      const onRefresh = jest.fn().mockResolvedValue({ newAccessToken: createMockJwt({}), newRefreshToken: createMockJwt({}) });
      const client = new JwtAuthClient({ onRefresh });
      client.setTokens(createMockJwt({}), createMockJwt({}));

      const success = await client.refreshAccessToken();

      expect(success).toBe(true);
      expect(onRefresh).toHaveBeenCalled();
      expect(client.getAccessToken()).not.toBeNull();
    });
  });

  describe('Verify', () => {
    it('should verify token with onVerify', async () => {
      const onVerify = jest.fn().mockResolvedValue(true);
      const client = new JwtAuthClient({ onVerify });
      client.setTokens(createMockJwt({}));

      const success = await client.verifyToken();

      expect(success).toBe(true);
      expect(onVerify).toHaveBeenCalled();
    });
  });
});