import type { StorageLike } from './types';

export function memoryStorage(): StorageLike {
  const store: Record<string, string> = {};
  return {
    getItem: (k: string) => (Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null),
    setItem: (k: string, v: string) => {
      store[k] = String(v);
    },
    removeItem: (k: string) => {
      delete store[k];
    },
  };
}

export function safeWebStorage(raw: Storage): StorageLike {
  return {
    getItem: (k) => {
      try { return raw.getItem(k); } catch { return null; }
    },
    setItem: (k, v) => {
      try { raw.setItem(k, v); } catch { /* ignore quota/blocked */ }
    },
    removeItem: (k) => {
      try { raw.removeItem(k); } catch { /* ignore */ }
    },
  };
}

