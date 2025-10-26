import { useCallback } from 'react';
import { useAuth } from './AuthContext';

export interface UseAuthFetchOptions {
  refreshOn401?: boolean;
  onUnauthorized?: (response: Response) => void | Promise<void>;
}

export function useAuthFetch(options: UseAuthFetchOptions = {}) {
  const { getAuthorizationHeader, refreshAccessToken } = useAuth();
  const { refreshOn401 = true, onUnauthorized } = options;

  return useCallback(
    async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const withHeaders = (ri?: RequestInit): RequestInit => ({
        ...ri,
        headers: { ...(ri?.headers as Record<string, string> | undefined), ...getAuthorizationHeader() },
      });

      const doFetch = (ri?: RequestInit) => fetch(input, withHeaders(ri));
      let response = await doFetch(init);
      if (response.status !== 401 || !refreshOn401) return response;
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        if (onUnauthorized) await onUnauthorized(response);
        return response;
      }
      response = await doFetch(init);
      if (response.status === 401 && onUnauthorized) await onUnauthorized(response);
      return response;
    },
    [getAuthorizationHeader, refreshAccessToken, refreshOn401, onUnauthorized]
  );
}

