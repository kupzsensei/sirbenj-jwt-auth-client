# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-10-26

Major release focused on robustness, security, and first-class React DX.

- Core
  - SSR-safe JWT decoding with base64url support and Node fallback.
  - Concurrency-safe token refresh; auto-refresh via `autoRefresh` + `refreshLeewaySeconds`.
  - Inclusive expiry checks with `clockSkewSeconds`.
  - Flexible API configs: `requestBuilder` for login/refresh/verify.
  - New types: `JwtPayload`, `StorageLike`.
  - `getAuthorizationHeader()` added for convenient header building.
- React
  - New guards: `RequireAuth`, `RequirePermissions`, and `AuthGate`.
  - `AuthProvider` adds cross-tab sync via `storage` event.
  - `useAuthFetch` helper for auth-aware fetch with refresh-on-401.
- TanStack Query (optional)
  - `useAuthQuery`, `useAuthMutation` provided as subpath export `sirbenj-jwt-auth-client/query`.
- Utilities
  - `createAuthFetch`, `withAuthHeaders`, `memoryStorage`, `safeWebStorage`.
- Build & Types
  - Declarations emitted for all exports.
  - Exports map includes query subpath.
  - Dev deps normalized for stable builds (TS 5.6, Jest 29).
- Docs & Examples
  - README overhaul with complete examples (createBrowserRouter, Query, Axios, SSR, permissions).
  - React example updated to use `createBrowserRouter` (keeps JSX Routes as alternative).
- Tests
  - Updated tests to match API (login returns object).

Potentially breaking
- Version bump to 2.x due to new config options and refined semantics:
  - Expiry check now inclusive by default with optional `clockSkewSeconds`.
  - `login` returns `{ tokenResponse, apiResponse } | null` (documented), ensure consumers accommodate.
  - Query helpers moved to subpath export `sirbenj-jwt-auth-client/query`.

Migration
- See MIGRATION.md for upgrade notes.

