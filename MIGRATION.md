## Migration Guide

This guide summarizes notable changes to adopt the latest version.

### Types and Options

- `JwtPayload` is now exported and used for payload typing.
- `JwtAuthClientOptions.storage` now accepts a `StorageLike` interface. The Web Storage API (`localStorage`/`sessionStorage`) remains compatible.

### Token Lifecycle

- Expiry checks treat `exp` inclusively with optional `clockSkewSeconds`. If your UI depended on the prior strict `>` check, verify boundary behavior.
- Optional `autoRefresh` and `refreshLeewaySeconds` can preemptively refresh tokens before expiry.

### API Config

- `loginApiConfig`, `refreshApiConfig`, and `verifyApiConfig` now support a `requestBuilder(ctx)` hook to fully control request URL and `RequestInit`.

### React

- Added `AuthGate`, `RequireAuth`, `RequirePermissions` components for common guard scenarios.
- Added `useAuthFetch(options)` to issue authenticated requests with automatic refresh-on-401.

### Fetch Helpers

- New helpers `createAuthFetch(client, options)` and `withAuthHeaders(client, init)` are available for non-React environments.

### Storage Helpers

- `memoryStorage()` and `safeWebStorage(storage)` are exported for convenience.

