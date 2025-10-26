import { useCallback } from 'react';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';
import { useAuth } from './AuthContext';

export type ParseMode = 'json' | 'text' | 'response' | 'blob' | 'arrayBuffer' | 'formData';

export interface RequestDescriptor {
  url: string | URL;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  parseAs?: ParseMode;
}

function parseResponse(res: Response, mode: ParseMode | undefined) {
  if (mode === 'response') return res;
  if (mode === 'text') return res.text();
  if (mode === 'blob') return res.blob();
  if (mode === 'arrayBuffer') return res.arrayBuffer();
  if (mode === 'formData') return res.formData();
  return res.json();
}

export function useAuthQuery<TData = unknown, TError = unknown>(
  queryKey: QueryKey,
  request: RequestDescriptor,
  options?: Omit<UseQueryOptions<TData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>
) {
  const { getAuthorizationHeader, refreshAccessToken } = useAuth();
  const queryFn = useCallback(async (): Promise<TData> => {
    const init: RequestInit = {
      method: request.method || 'GET',
      headers: { ...(request.headers || {}), ...getAuthorizationHeader() },
      body: request.body && typeof request.body !== 'string' ? JSON.stringify(request.body) : request.body,
    };
    const res = await fetch(request.url, init);
    if (res.status === 401) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        const retry = await fetch(request.url, {
          ...init,
          headers: { ...(request.headers || {}), ...getAuthorizationHeader() },
        });
        if (!retry.ok) throw new Error(`HTTP ${retry.status}`);
        return (await parseResponse(retry, request.parseAs)) as unknown as TData;
      }
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await parseResponse(res, request.parseAs)) as unknown as TData;
  }, [request.url, request.method, request.headers, request.body, request.parseAs, getAuthorizationHeader, refreshAccessToken]);

  return useQuery<TData, TError>({ queryKey, queryFn, ...(options as any) });
}

export function useAuthMutation<TData = unknown, TError = unknown, TVariables = any, TContext = unknown>(
  requestBuilder: (variables: TVariables) => RequestDescriptor,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
) {
  const { getAuthorizationHeader, refreshAccessToken } = useAuth();
  const mutationFn = useCallback(async (variables: TVariables): Promise<TData> => {
    const req = requestBuilder(variables);
    const init: RequestInit = {
      method: req.method || 'POST',
      headers: { 'Content-Type': 'application/json', ...(req.headers || {}), ...getAuthorizationHeader() },
      body: req.body && typeof req.body !== 'string' ? JSON.stringify(req.body) : req.body,
    };
    const res = await fetch(req.url, init);
    if (res.status === 401) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        const retry = await fetch(req.url, {
          ...init,
          headers: { ...(req.headers || {}), ...getAuthorizationHeader() },
        });
        if (!retry.ok) throw new Error(`HTTP ${retry.status}`);
        return (await parseResponse(retry, req.parseAs)) as unknown as TData;
      }
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await parseResponse(res, req.parseAs)) as unknown as TData;
  }, [requestBuilder, getAuthorizationHeader, refreshAccessToken]);

  return useMutation<TData, TError, TVariables, TContext>({ mutationFn, ...(options as any) });
}
