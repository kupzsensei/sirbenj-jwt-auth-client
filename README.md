# Sirbenj JWT Auth Client

A lightweight, dependency-free JavaScript library for handling JWT authentication on the frontend, now with refresh token support. It's designed to be framework-agnostic and works seamlessly in both vanilla JavaScript/HTML projects and React applications.

**Disclaimer**: This library is a *client-side* helper. It assumes the JWT you receive from your server has already been validated. You should never trust the contents of a JWT payload on the client for authorization without re-validating with your backend.

## Features

-  **TypeScript Support**: Fully typed for better developer experience.
-  **Framework-Agnostic Core**: Can be used in any JavaScript/TypeScript project.
- ⚛️ **React Hooks**: Simple `useAuth` hook and `AuthProvider` for easy React integration.
-  **Refresh Token Support**: Automatically refreshes the access token when it expires.
-  **Roles & Permissions Handling**: Easily check user roles and permissions based on JWT claims.
-  **Zero Dependencies**: Keeps your project light.
-  **Flexible Storage**: Defaults to `localStorage`, but can be configured to use `sessionStorage`, cookies, or any other storage mechanism.
- **Expiration Check**: Easily check if the JWT has expired.
-  **Payload Decoding**: Decode the JWT payload to access claims (e.g., user ID, roles).
-  **Secure**: Does not attempt to validate the JWT signature (which should always be done on the server).

## Installation

```bash
npm install sirbenj-jwt-auth-client
```

## Usage

This library can be used in both React and vanilla JavaScript projects.

- **For React applications**, see the [Usage in React](#usage-in-react) section below.
- **For vanilla JavaScript**, see the [Vanilla JS Usage](#vanilla-js-usage) section.

### Configuration

You can configure the storage mechanism and other options by passing a configuration object to either `JwtAuthClient` (for vanilla JS) or `AuthProvider` (for React).

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `storage` | `Object` | `window.localStorage` | Storage mechanism (e.g., `sessionStorage`, `cookieStorageAdapter`). Must implement `getItem`, `setItem`, `removeItem`. |
| `onLogin` | `Function` | `null` | An async function that handles calling your API's login endpoint. Receives `credentials` and should return `{ accessToken, refreshToken }`. |
| `onVerify` | `Function` | `null` | An async function that verifies the access token with your backend. Receives `accessToken` and should return `true` if valid, `false` otherwise. |
| `onRefresh` | `Function` | `null` | An async function that handles calling your API's refresh endpoint. **Required for refresh functionality.** |
| `accessTokenKey` | `String` | `'jwt_access_token'` | The key used to store the access token. |
| `refreshTokenKey` | `String` | `'jwt_refresh_token'` | The key used to store the refresh token. |
| `rolesClaim` | `String` | `'roles'` | The key in the JWT payload where roles are stored. |
| `permissionsClaim` | `String` | `'permissions'` | The key in the JWT payload where permissions are stored. |
| `loginApiConfig` | `Object` | `null` | Declarative configuration for the login API endpoint. |
| `refreshApiConfig` | `Object` | `null` | Declarative configuration for the refresh API endpoint. |
| `verifyApiConfig` | `Object` | `null` | Declarative configuration for the verify API endpoint. |

#### Declarative API Configuration Details

For `loginApiConfig`, `refreshApiConfig`, and `verifyApiConfig`, you can provide an object with the following structure:

```typescript
interface ApiConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  responseMapping?: {
    // For loginApiConfig:
    accessToken?: string; // Path to access token in response (e.g., 'data.token')
    refreshToken?: string; // Path to refresh token in response

    // For refreshApiConfig:
    newAccessToken?: string; // Path to new access token in response
    newRefreshToken?: string; // Path to new refresh token in response

    // For verifyApiConfig:
    isValid?: string; // Path to boolean indicating validity (e.g., 'status.success')
  };
}
```

**Note:** If both a callback function (`onLogin`, `onRefresh`, `onVerify`) and a declarative API configuration (`loginApiConfig`, `refreshApiConfig`, `verifyApiConfig`) are provided for the same operation, the callback function will take precedence.

--- 

## Usage in React

For React applications, the library provides an `AuthProvider` component and a `useAuth` hook for easy integration.

▶️ **[Live React Example](examples/react-example)**: Check out the [React example](./examples/react-example) for a complete, runnable project.

### Step 1: Configure Authentication Logic

Instead of providing `onLogin`, `onRefresh`, and `onVerify` functions, you can use declarative API configurations for common REST API patterns.

```javascript
// src/authConfig.js
const authConfig = {
  loginApiConfig: {
    url: 'https://your-api.com/auth/login',
    method: 'POST',
    // Map your API response to extract tokens
    responseMapping: {
      accessToken: 'data.accessToken', // e.g., if your response is { data: { accessToken: '...' } }
      refreshToken: 'data.refreshToken',
    },
  },
  refreshApiConfig: {
    url: 'https://your-api.com/auth/refresh',
    method: 'POST',
    responseMapping: {
      newAccessToken: 'token', // e.g., if your response is { token: '...' }
      newRefreshToken: 'refreshToken',
    },
  },
  verifyApiConfig: {
    url: 'https://your-api.com/auth/verify',
    method: 'GET',
    responseMapping: {
      isValid: 'status.success', // e.g., if your response is { status: { success: true } }
    },
  },
  // ... other configurations like storage, accessTokenKey, etc.
};

export default authConfig;
```

### Step 2: Wrap your app with `AuthProvider`

Import your `authConfig` and pass it to the `AuthProvider`.

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from 'sirbenj-jwt-auth-client';
import authConfig from './authConfig'; // Import your declarative config

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

### Step 3: Use the `useAuth` hook

```javascript
// src/components/LoginComponent.js
import React from 'react';
import { useAuth } from 'sirbenj-jwt-auth-client';

function LoginComponent() {
  const { isAuthenticated, login, logout, userPayload } = useAuth();

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {userPayload.name}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <button onClick={() => login({ username: 'user', password: 'pass' })}>Login</button>;
}
```

### `useAuth()` Return Values

Here's a detailed breakdown of the values and functions returned by the `useAuth()` hook, along with examples:

| Key | Type | Description |
| --- | --- | --- |
| `isAuthenticated` | `Boolean` | `true` if a valid, non-expired, and verified token exists. |
| `userPayload` | `Object` | The decoded payload of the access token, or `null`. |
| `accessToken` | `String` | The raw access token string, or `null`. |
| `login(credentials, loginUrl?)` | `Function` | Initiates login. Returns `Promise<{ tokenResponse: TokenResponse, apiResponse: any } | null>`. |
| `logout()` | `Function` | Clears tokens and auth state. |
| `loading` | `Boolean` | `true` during initial auth state check. |
| `isRefreshing` | `Boolean` | `true` while refreshing the access token. |
| `refreshAccessToken()` | `Function` | Manually triggers a token refresh. |
| `verifyToken()` | `Function` | Manually triggers backend token verification. |
| `getRoles()` / `hasRole(s)` | `Function` | Functions to check user roles. |
| `getPermissions()` / `hasPermission(s)` | `Function` | Functions to check user permissions. |

#### Examples of `useAuth()` Return Values and Methods

```javascript
import React, { useState } from 'react';
import { useAuth } from 'sirbenj-jwt-auth-client';

function AuthComponent() {
  const {
    isAuthenticated,
    userPayload,
    accessToken,
    login,
    logout,
    loading,
    isRefreshing,
    refreshAccessToken,
    verifyToken,
    getRoles,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    getPermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // The login function now returns an object containing tokenResponse and apiResponse
    const result = await login({ username, password });
    if (result) {
      console.log('Login successful!');
      console.log('Access Token:', result.tokenResponse.accessToken);
      console.log('Full API Response:', result.apiResponse);
      // You can access the tokens directly from result.tokenResponse if needed
    } else {
      console.error('Login failed.');
    }
  };

  const handleRefresh = async () => {
    const success = await refreshAccessToken();
    if (success) {
      console.log('Token refreshed successfully!');
    } else {
      console.error('Token refresh failed.');
    }
  };

  const handleVerify = async () => {
    const verified = await verifyToken();
    if (verified) {
      console.log('Token verified by backend!');
    } else {
      console.error('Token verification failed by backend!');
    }
  };

  if (loading) {
    return <div>Loading authentication state...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {userPayload?.name || 'User'}!</p>
          <p>Access Token: {accessToken ? accessToken.substring(0, 20) + '...' : 'N/A'}</p>
          <p>Roles: {getRoles().join(', ')}</p>
          <p>Has 'admin' role: {hasRole('admin') ? 'Yes' : 'No'}</p>
          <p>Has 'editor' or 'viewer' role: {hasAnyRole(['editor', 'viewer']) ? 'Yes' : 'No'}</p>
          <p>Has 'admin' and 'user' roles: {hasAllRoles(['admin', 'user']) ? 'Yes' : 'No'}</p>
          <p>Permissions: {getPermissions().join(', ')}</p>
          <p>Has 'read' permission: {hasPermission('read') ? 'Yes' : 'No'}</p>
          <button onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? 'Refreshing...' : 'Refresh Token'}
          </button>
          <button onClick={handleVerify}>Verify Token</button>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Not authenticated.</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default AuthComponent;
```

#### Roles and Permissions in JWT Payload

The roles and permissions are extracted directly from the JWT payload. There isn't a separate API call for them. The library expects the JWT payload to
  contain claims (keys) that hold arrays of roles and permissions.


  By default, the library looks for:
   * `roles` for roles
   * `permissions` for permissions

  You can configure these claim names using `rolesClaim` and `permissionsClaim` in the `JwtAuthClientOptions`.

  **Example JWT Payload:**

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622,
  "roles": ["admin", "editor"],
  "permissions": ["user:read", "user:write", "product:read"]
}
```


  In this example:
   * `getRoles()` would return `["admin", "editor"]`
   * `hasRole("admin")` would return `true`
   * `getPermissions()` would return `["user:read", "user:write", "product:read"]`
   * `hasPermission("user:write")` would return `true`

--- 

## Vanilla JS Usage

The core `JwtAuthClient` class can be used in any JavaScript project.

### Example

```javascript
import { JwtAuthClient } from 'sirbenj-jwt-auth-client';

// 1. Configure your auth logic
const onRefresh = async (refreshToken) => {
  // ... call your refresh API
  return { newAccessToken: '...' };
};

// 2. Create a client instance
const authClient = new JwtAuthClient({ onRefresh });

// 3. Use the client
document.getElementById('login-btn').addEventListener('click', async () => {
  const success = await authClient.login({ username: 'user', password: 'pass' }, 'https://api.com/login');
  if (success) {
    console.log('Logged in!');
    updateUI();
  }
});

function updateUI() {
  if (authClient.isAuthenticated()) {
    const payload = authClient.getPayload();
    document.getElementById('user-info').textContent = `Welcome, ${payload.name}`;
  } else {
    document.getElementById('user-info').textContent = 'Logged out';
  }
}

// Initial UI update
updateUI();
```

### `JwtAuthClient` Methods

The `JwtAuthClient` instance provides the same methods for role and permission checking as the `useAuth` hook, along with methods for direct token and payload access.

- `login(credentials, loginUrl?)`
- `logout()`
- `getAccessToken()`
- `getRefreshToken()`
- `getPayload()`
- `isAuthenticated()`
- `isAccessTokenExpired()`
- `refreshAccessToken()`
- `verifyToken()`
- `getRoles()`
- `hasRole(role)`
- `hasAnyRole(roles)`
- `hasAllRoles(roles)`
- `getPermissions()`
- `hasPermission(permission)`
- `hasAnyPermission(permissions)`
- `hasAllPermissions(permissions)`

--- 

## Example: Using Cookies with `js-cookie`

For a robust cookie implementation, use the `js-cookie` library.

#### Step 1: Install `js-cookie`

```bash
npm install js-cookie
```

#### Step 2: Create a Storage Adapter and Configure

```javascript
import { AuthProvider } from 'sirbenj-jwt-auth-client'; // or JwtAuthClient
import Cookies from 'js-cookie';

// Define the cookie storage adapter
const cookieStorageAdapter = {
  getItem: (key) => Cookies.get(key),
  setItem: (key, value) => Cookies.set(key, value, { expires: 7, secure: true, sameSite: 'strict' }),
  removeItem: (key) => Cookies.remove(key)
};

const authConfig = {
  storage: cookieStorageAdapter,
  // ... other config
};

// In React:
// <AuthProvider config={authConfig}>...</AuthProvider>

// In Vanilla JS:
// const client = new JwtAuthClient(authConfig);
```

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sirbenj/sirbenj-jwt-auth-client/issues).

## License

This project is [MIT](./LICENSE) licensed.