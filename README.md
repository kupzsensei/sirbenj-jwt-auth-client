# Sirbenj JWT Auth Client

A robust, dependency-free JWT auth toolkit for React and vanilla JS. It’s framework-agnostic at the core, with ergonomic React helpers, permission-aware guards, an auth-aware fetch wrapper, and secure token lifecycle management with auto-refresh.

Important: This is a client-side helper. Always validate and authorize on your backend. JWT signatures are not validated in the client.

## Highlights

- TypeScript-first, CJS + ESM + UMD builds with .d.ts
- Framework-agnostic core `JwtAuthClient`
- React `AuthProvider` + `useAuth`
- Permission-aware guards: `RequireAuth`, `RequirePermissions`, `AuthGate`
- Auto-refresh before expiry + clock skew handling
- Concurrency-safe refresh, SSR-safe JWT decoding
- Cross-tab token sync and flexible storage adapters
- Auth-aware fetch helper with optional refresh-on-401
- First-class TanStack Query helpers for queries and mutations

## Install

```bash
npm install sirbenj-jwt-auth-client
```

## Quick Start (React)

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from 'sirbenj-jwt-auth-client';

const authConfig = {
  autoRefresh: true,
  refreshLeewaySeconds: 60,
  loginApiConfig: {
    url: 'https://api.example.com/auth/login',
    method: 'POST',
    responseMapping: { accessToken: 'data.accessToken', refreshToken: 'data.refreshToken' },
  },
  refreshApiConfig: {
    url: 'https://api.example.com/auth/refresh',
    method: 'POST',
    responseMapping: { newAccessToken: 'data.accessToken', newRefreshToken: 'data.refreshToken' },
  },
  verifyApiConfig: {
    url: 'https://api.example.com/auth/verify',
    method: 'GET',
    responseMapping: { isValid: 'ok' },
  },
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

Use in a component:

```tsx
import { useAuth, RequireAuth, RequirePermissions } from 'sirbenj-jwt-auth-client';
import { Navigate } from 'react-router-dom';

export function Profile() {
  const { userPayload, logout } = useAuth();
  return (
    <div>
      <h3>Welcome {userPayload?.name}</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export function RoutesExample() {
  return (
    <RequireAuth fallback={<Navigate to="/login" replace />}> 
      <RequirePermissions anyOf={["user:read"]} fallback={<Navigate to="/forbidden" replace />}> 
        <Profile />
      </RequirePermissions>
    </RequireAuth>
  );
}
```

## Auth-Aware Fetch

Option A (React): use the built-in hook

```ts
import { useAuthFetch } from 'sirbenj-jwt-auth-client';

function useApi() {
  const authFetch = useAuthFetch({ refreshOn401: true });
  return {
    async getMe() {
      const res = await authFetch('https://api.example.com/me');
      return res.json();
    },
  };
}
```

Option B (Vanilla): bind to a client instance

```ts
import { JwtAuthClient, createAuthFetch } from 'sirbenj-jwt-auth-client';

const client = new JwtAuthClient({ /* ... */ });
const authFetch = createAuthFetch(client, { refreshOn401: true });
```

Tip: You can also use `withAuthHeaders(client, init)` to attach headers to axios or other clients.

## TanStack Query Integration

Install TanStack Query in your app:

```bash
npm i @tanstack/react-query
```

Use `useAuthQuery` and `useAuthMutation` to standardize API calls with loading/error states and retries:

```tsx
import { useAuthQuery, useAuthMutation } from 'sirbenj-jwt-auth-client/query';

function UsersList() {
  const { data, isLoading, error } = useAuthQuery(['users'], {
    url: 'https://api.example.com/users',
    method: 'GET',
    parseAs: 'json',
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

function CreateUserButton() {
  const mutation = useAuthMutation((user: { name: string }) => ({
    url: 'https://api.example.com/users',
    method: 'POST',
    body: user,
    parseAs: 'json',
  }));

  return (
    <button onClick={() => mutation.mutate({ name: 'Alice' })} disabled={mutation.isLoading}>
      {mutation.isLoading ? 'Creating...' : 'Create User'}
    </button>
  );
}
```

Notes
- These hooks attach the Authorization header automatically and will attempt a token refresh on 401 before retrying.
- All standard TanStack Query options are supported via the `options` parameter.

## React Router v6 Example (Guards + Query)

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, RequireAuth, RequirePermissions } from 'sirbenj-jwt-auth-client';
import { useAuthQuery } from 'sirbenj-jwt-auth-client/query';

const queryClient = new QueryClient();

function Dashboard() {
  const { data, isLoading } = useAuthQuery(['me'], { url: '/api/me', method: 'GET' });
  if (isLoading) return <div>Loading...</div>;
  return <div>Hello {data.name}</div>;
}

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: (
      <RequireAuth fallback={<Navigate to="/login" replace />}> 
        <RequirePermissions anyOf={["user:read"]} fallback={<Navigate to="/forbidden" replace />}> 
          <Dashboard />
        </RequirePermissions>
      </RequireAuth>
    ),
  },
  { path: '/login', element: <div>Login page</div> },
  { path: '/forbidden', element: <div>Forbidden</div> },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
]);

const authConfig = { /* see Quick Start config above */ };

createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <AuthProvider config={authConfig}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  );
```

## Vanilla JS Quick Start

```js
import { JwtAuthClient } from 'sirbenj-jwt-auth-client';

const client = new JwtAuthClient({
  loginApiConfig: {
    url: '/api/login',
    method: 'POST',
    responseMapping: { accessToken: 'access', refreshToken: 'refresh' },
  },
  refreshApiConfig: {
    url: '/api/refresh',
    method: 'POST',
    responseMapping: { newAccessToken: 'access', newRefreshToken: 'refresh' },
  },
});

document.getElementById('login-btn').addEventListener('click', async () => {
  const result = await client.login({ username: 'u', password: 'p' });
  if (result) alert('Logged in');
});

async function fetchMe() {
  const res = await fetch('/api/me', { headers: client.getAuthorizationHeader() });
  if (res.status === 401) {
    const ok = await client.refreshAccessToken();
    if (!ok) return null;
    return fetch('/api/me', { headers: client.getAuthorizationHeader() }).then(r => r.json());
  }
  return res.json();
}
```

## Axios Integration

```ts
import axios from 'axios';
import { JwtAuthClient } from 'sirbenj-jwt-auth-client';

const client = new JwtAuthClient({ /* ... */ });
const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  config.headers = { ...(config.headers || {}), ...client.getAuthorizationHeader() };
  return config;
});

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    if (error.response?.status === 401) {
      const ok = await client.refreshAccessToken();
      if (ok) return api.request(error.config);
    }
    return Promise.reject(error);
  }
);
```

## Cookie/HttpOnly Refresh Flow

Recommended: store refresh token as HttpOnly cookie, and return access token in the refresh response. Example using `requestBuilder` to send credentials:

```ts
const authConfig = {
  refreshApiConfig: {
    url: '/auth/refresh',
    method: 'POST',
    headers: {},
    requestBuilder: () => ({ init: { credentials: 'include' } }),
    responseMapping: { newAccessToken: 'accessToken' },
  },
};
```

## Custom Request Builders

Control request shape (URL, headers, body) beyond defaults:

```ts
const authConfig = {
  loginApiConfig: {
    url: '/auth/login',
    requestBuilder: ({ credentials }) => ({
      init: {
        headers: { 'X-Client': 'web' },
        body: JSON.stringify({ user: credentials.username, pass: credentials.password }),
      },
    }),
    responseMapping: { accessToken: 'jwt', refreshToken: 'refresh' },
  },
  verifyApiConfig: {
    url: '/auth/verify',
    method: 'GET',
    requestBuilder: ({ accessToken }) => ({ url: `/auth/verify?token=${accessToken}` }),
    responseMapping: { isValid: 'ok' },
  },
};
```

## Auto-Refresh and Skew

```ts
const authConfig = {
  autoRefresh: true,             // schedule refresh automatically
  refreshLeewaySeconds: 60,      // refresh 60s before expiry
  clockSkewSeconds: 5,           // tolerate 5s skew
};
```

## SSR Usage (Next.js)

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { AuthProvider, memoryStorage } from 'sirbenj-jwt-auth-client';

const authConfig = {
  storage: typeof window === 'undefined' ? memoryStorage() : undefined,
  // ...other options
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider config={authConfig}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
```

## Roles & Permissions Helpers

```ts
const { getRoles, hasRole, hasAnyRole, hasAllRoles, getPermissions, hasPermission } = useAuth();
hasRole('admin');
hasAnyRole(['editor', 'viewer']);
hasAllRoles(['admin', 'user']);
hasPermission('user:read');
```

Guarding UI by permission:

```tsx
import { RequirePermissions } from 'sirbenj-jwt-auth-client';

<RequirePermissions anyOf={["user:read"]} fallback={<span>No access</span>}>
  <SecretPanel />
</RequirePermissions>
```

## Manual Verify and Refresh

```ts
const { verifyToken, refreshAccessToken } = useAuth();
await verifyToken();
await refreshAccessToken();
```

## Storage Adapters

```ts
import { memoryStorage, safeWebStorage } from 'sirbenj-jwt-auth-client';

// In-memory only
const client = new JwtAuthClient({ storage: memoryStorage() });

// Safer web storage wrapper
const saferLocal = safeWebStorage(window.localStorage);
const client2 = new JwtAuthClient({ storage: saferLocal });
```

## API

- `JwtAuthClient(options)` Core client usable anywhere.
  - `login(credentials, loginUrl?) => Promise<{ tokenResponse, apiResponse } | null>`
  - `logout()`
  - `getAccessToken()` / `getRefreshToken()` / `getAuthorizationHeader()`
  - `getPayload()` / `isAccessTokenExpired()` / `isAuthenticated()`
  - `refreshAccessToken()` / `verifyToken()`
  - Role/permission helpers: `getRoles`, `hasRole`, `hasAnyRole`, `hasAllRoles`, `getPermissions`, `hasPermission`, `hasAnyPermission`, `hasAllPermissions`

- React
  - `AuthProvider({ config, children })`
  - `useAuth()` returns:
    - `isAuthenticated`, `userPayload`, `accessToken`, `loading`, `isRefreshing`
    - `login`, `logout`, `refreshAccessToken`, `verifyToken`, `getAuthorizationHeader`
    - role/permission helpers
  - Guards: `AuthGate`, `RequireAuth`, `RequirePermissions`

- Fetch helpers
  - `createAuthFetch(client, { refreshOn401 = true, onUnauthorized })`
  - `withAuthHeaders(client, init)`

## Configuration

```ts
type JwtAuthClientOptions = {
  storage?: { getItem(k): string|null; setItem(k,v: string): void; removeItem(k): void };
  accessTokenKey?: string; // default 'jwt_access_token'
  refreshTokenKey?: string; // default 'jwt_refresh_token'
  rolesClaim?: string; // default 'roles'
  permissionsClaim?: string; // default 'permissions'
  autoRefresh?: boolean; // default false
  refreshLeewaySeconds?: number; // default 30
  clockSkewSeconds?: number; // default 0
  enableStorageSync?: boolean; // cross-tab sync handled by provider

  onLogin?: (credentials) => Promise<{ accessToken: string; refreshToken?: string }>; // takes precedence
  onRefresh?: (refreshToken: string) => Promise<{ newAccessToken: string; newRefreshToken?: string }>;
  onVerify?: (accessToken: string) => Promise<boolean>;

  loginApiConfig?: {
    url: string; method?: 'GET'|'POST'|'PUT'|'DELETE'; headers?: Record<string,string>;
    responseMapping?: { accessToken?: string; refreshToken?: string };
    requestBuilder?: (ctx: { credentials: any }) => { url?: string; init?: RequestInit };
  };
  refreshApiConfig?: {
    url: string; method?: 'GET'|'POST'|'PUT'|'DELETE'; headers?: Record<string,string>;
    responseMapping?: { newAccessToken?: string; newRefreshToken?: string };
    requestBuilder?: (ctx: { refreshToken: string|null }) => { url?: string; init?: RequestInit };
  };
  verifyApiConfig?: {
    url: string; method?: 'GET'|'POST'|'PUT'|'DELETE'; headers?: Record<string,string>;
    responseMapping?: { isValid?: string };
    requestBuilder?: (ctx: { accessToken: string|null }) => { url?: string; init?: RequestInit };
  };
}
```

Notes
- If both callback and declarative config are provided, the callback is used.
- `autoRefresh` schedules a refresh a few seconds before expiry.
- `clockSkewSeconds` tolerates small time differences with the issuer.

## Roles and Permissions

Claims are read from the access token payload (defaults: `roles`, `permissions`). Configure via `rolesClaim` and `permissionsClaim` as needed.

```json
{
  "sub": "123",
  "name": "John Doe",
  "exp": 1716242622,
  "roles": ["admin", "editor"],
  "permissions": ["user:read", "user:write"]
}
```

Use guards in React:

```tsx
<RequireAuth fallback={<Navigate to="/login" replace />}> 
  <RequirePermissions anyOf={["user:read"]} fallback={<Navigate to="/forbidden" replace />}>
    <Dashboard />
  </RequirePermissions>
</RequireAuth>
```

## Storage and Security

- Default storage is `localStorage` in the browser and an in-memory fallback in SSR/Node.
- For best security, prefer: refresh token in HttpOnly secure cookie; access token in memory only (do not persist). You can implement a custom storage adapter that stores only the access token in memory.
- If you must use Web Storage, ensure your app is free of XSS and uses a strict CSP.

## SSR Safety

JWT decoding is SSR-safe (Node environments without `atob` are supported). The client falls back to in-memory storage when the DOM isn’t available.

## Cross-Tab Sync

The React provider listens to `storage` events and updates auth state across tabs (when using Web Storage).

## Examples

- React example: `examples/react-example`
- Add your router fallback using `<Navigate />` or your preferred solution.

## License

[MIT](./LICENSE)
