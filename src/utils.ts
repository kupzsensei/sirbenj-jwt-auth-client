import { JwtAuthClient } from './JwtAuthClient';

export interface AuthFetchOptions {
  refreshOn401?: boolean;
  onUnauthorized?: (response: Response) => void | Promise<void>;
}

export function withAuthHeaders(client: JwtAuthClient, init?: RequestInit): RequestInit {
  const headers = { ...(init?.headers as Record<string, string> | undefined), ...client.getAuthorizationHeader() };
  return { ...init, headers };
}

export function createAuthFetch(client: JwtAuthClient, options: AuthFetchOptions = {}) {
  const { refreshOn401 = true, onUnauthorized } = options;

  return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const doFetch = (reqInit?: RequestInit) => fetch(input, withAuthHeaders(client, reqInit));

    let response = await doFetch(init);
    if (response.status !== 401 || !refreshOn401) {
      return response;
    }

    // Attempt token refresh once, then retry the request
    const refreshed = await client.refreshAccessToken();
    if (!refreshed) {
      if (onUnauthorized) await onUnauthorized(response);
      return response;
    }
    response = await doFetch(init);
    if (response.status === 401 && onUnauthorized) await onUnauthorized(response);
    return response;
  };
}

export type AuthFetch = ReturnType<typeof createAuthFetch>;

