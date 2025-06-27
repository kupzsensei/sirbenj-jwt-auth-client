# Sirbenj JWT Auth Client

A lightweight, dependency-free JavaScript library for handling JWT authentication on the frontend, now with refresh token support. It's designed to be framework-agnostic and works seamlessly in both vanilla JavaScript/HTML projects and React applications.

## ✨ Features

-  **Framework-Agnostic Core**: Can be used in any JavaScript project.
    
- ⚛️ **React Hooks**: Simple `useAuth` hook and `AuthProvider` for easy React integration.
    
-  **Refresh Token Support**: Automatically refreshes the access token when it expires.
    
-  **Zero Dependencies**: Keeps your project light.
    
-  **Flexible Storage**: Defaults to `localStorage`, but can be configured to use `sessionStorage`, cookies, or any other storage mechanism.
    
- **Expiration Check**: Easily check if the JWT has expired.
    
-  **Payload Decoding**: Decode the JWT payload to access claims (e.g., user ID, roles).
    
-  **Secure**: Does not attempt to validate the JWT signature (which should always be done on the server).
    

**Disclaimer**: This library is a *client-side* helper. It assumes the JWT you receive from your server has already been validated. You should never trust the contents of a JWT payload on the client for authorization without re-validating with your backend.

## 🚀 Installation

```
npm install sirbenj-jwt-auth-client
```

## Usage in React

### Step 1: Configure Refresh Logic

The most important part of using refresh tokens is to provide a function that calls your backend API to get a new access token.

Create an `onRefresh` function like the one below. This function receives the `refreshToken` and must return a promise that resolves to an object with the `newAccessToken` and optionally a `newRefreshToken`.

```
// src/auth.js
export const onRefresh = async (refreshToken) => {
  try {
    const response = await fetch('https://your-api.com/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await response.json();
    
    return {
      newAccessToken,
      newRefreshToken, // This is optional, if your API provides a new one
    };
  } catch (error) {
    console.error(error);
    // Important: throw the error to notify the library that the refresh failed
    throw error;
  }
};
```

### Step 2: Wrap your app with `AuthProvider`

Now, pass your `onRefresh` function into the `AuthProvider`'s configuration.

```
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from 'sirbenj-jwt-auth-client';
import { onRefresh } from './auth'; // Import your function

const authConfig = {
  onRefresh: onRefresh,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

### Step 3: Use the `useAuth` hook in your components

The `login` function now accepts both an `accessToken` and a `refreshToken`.

```
// src/components/LoginComponent.js
import React from 'react';
import { useAuth } from 'sirbenj-jwt-auth-client';

function LoginComponent() {
  const { isAuthenticated, login, logout, userPayload, isRefreshing } = useAuth();

  const handleLogin = async () => {
    // In a real app, you would get these tokens from your API login endpoint
    const loginData = {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2NDE4MDU4MDB9.iGf6nF0p-_Y0g8vLqD7wG5aY9sX3aF9nE7bH0bX9dZc', // An expired token
      refreshToken: 'a_valid_refresh_token_from_your_api'
    };
    login(loginData.accessToken, loginData.refreshToken);
  };

  if (isRefreshing) {
    return <div>Loading session...</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {userPayload.name}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <p>You are not logged in.</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginComponent;
```

### `useAuth()` Return Values

|     |     |     |
| --- | --- | --- |
| **Key** | **Type** | **Description** |
| `isAuthenticated` | `Boolean` | `true` if a valid, non-expired access token exists. |
| `userPayload` | `Object` | The decoded payload of the access token, or `null`. |
| `accessToken` | `String` | The raw access token string, or `null`. |
| `login(accessToken, refreshToken?)` | `Function` | Saves the tokens and updates the auth state. |
| `logout()` | `Function` | Clears tokens and updates auth state. |
| `loading` | `Boolean` | `true` during the initial auth state check. |
| `isRefreshing` | `Boolean` | `true` while the library is attempting to refresh the access token. |
| `refreshAccessToken()` | `Function` | A manual trigger to attempt a token refresh. Returns `Promise<boolean>`. |

## ⚙️ Configuration

You can configure the storage mechanism and other options by passing a configuration object.

|     |     |     |     |
| --- | --- | --- | --- |
| **Key** | **Type** | **Default** | **Description** |
| `storage` | `Object` | `window.localStorage` | Storage mechanism (e.g., `sessionStorage`, `cookieStorageAdapter`). Must implement `getItem`, `setItem`, `removeItem`. |
| `onRefresh` | `Function` | `null` | An async function that handles calling your API's refresh endpoint. **Required for refresh functionality.** |
| `accessTokenKey` | `String` | `'jwt_access_token'` | The key used to store the access token. |
| `refreshTokenKey` | `String` | `'jwt_refresh_token'` | The key used to store the refresh token. |

### Example: Using Cookies with `js-cookie`

For a robust cookie implementation, use the `js-cookie` library.

#### Step 1: Install `js-cookie`

```
npm install js-cookie
```

#### Step 2: Create a Storage Adapter and Configure

```
// src/index.js
import { AuthProvider } from 'sirbenj-jwt-auth-client';
import Cookies from 'js-cookie';
import { onRefresh } from './auth';

// Define the cookie storage adapter
const cookieStorageAdapter = {
  getItem: (key) => Cookies.get(key),
  setItem: (key, value) => Cookies.set(key, value, { expires: 7, secure: true, sameSite: 'strict' }),
  removeItem: (key) => Cookies.remove(key)
};

const authConfig = {
  storage: cookieStorageAdapter,
  onRefresh: onRefresh,
  accessTokenKey: 'my_app_access_token', // Optional custom key
  refreshTokenKey: 'my_app_refresh_token' // Optional custom key
};

root.render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

##  Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/sirbenj-jwt-auth-client/issues "null").

##  License

This project is [MIT](./LICENSE) licensed.