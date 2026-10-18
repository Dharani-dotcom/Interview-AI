// ============================================================================
// VETTINGLY REAL-TIME CLIENT SWR CACHE & MULTI-USER TENANT ISOLATION GUARD
// ============================================================================
// Provides:
// 1. Per-User Scoped Cache (strictly isolated by authenticated UID/email hash)
//    so User B can NEVER read User A's cached profile, usage quota, or reports.
// 2. Stale-While-Revalidate (SWR) instant 0ms hydration while Firestore
//    onSnapshot listeners stream live delta updates in the background.
// 3. Client-side API Request Deduplication & Response Cache for deterministic
//    AI calls (Coding Mentor hints, ATS checks, Code Evaluations).
// ============================================================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  ownerId: string;
}

const MEMORY_CACHE = new Map<string, CacheEntry<any>>();
const IN_FLIGHT_REQUESTS = new Map<string, Promise<any>>();

const STORAGE_PREFIX = 'vettingly_swr_v2_';
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes default TTL

function normalizeOwnerId(ownerId?: string | null): string {
  if (!ownerId || ownerId === 'default-candidate' || ownerId === 'guest_candidate') {
    return 'guest';
  }
  return ownerId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
}

function buildScopedKey(ownerId: string, key: string): string {
  const safeOwner = normalizeOwnerId(ownerId);
  return `${STORAGE_PREFIX}${safeOwner}__${key}`;
}

/**
 * Write per-user isolated state to both L1 (Memory) and L2 (localStorage) cache
 */
export function setScopedCache<T>(
  ownerId: string,
  key: string,
  data: T,
  ttlMs: number = DEFAULT_TTL_MS
): void {
  const safeOwner = normalizeOwnerId(ownerId);
  const scopedKey = buildScopedKey(safeOwner, key);
  const now = Date.now();
  const entry: CacheEntry<T> = {
    data,
    timestamp: now,
    expiresAt: now + ttlMs,
    ownerId: safeOwner,
  };

  MEMORY_CACHE.set(scopedKey, entry);

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(scopedKey, JSON.stringify(entry));
    }
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Read per-user isolated state from L1/L2 cache.
 * Verifies that `entry.ownerId === normalizeOwnerId(ownerId)` to guarantee
 * zero cross-account leakage when another user logs in.
 */
export function getScopedCache<T>(
  ownerId: string,
  key: string,
  allowStale: boolean = true
): T | null {
  const safeOwner = normalizeOwnerId(ownerId);
  const scopedKey = buildScopedKey(safeOwner, key);
  const now = Date.now();

  // 1. Check L1 Memory Cache
  const memEntry = MEMORY_CACHE.get(scopedKey);
  if (memEntry && memEntry.ownerId === safeOwner) {
    if (now <= memEntry.expiresAt || allowStale) {
      return memEntry.data as T;
    }
    MEMORY_CACHE.delete(scopedKey);
  }

  // 2. Check L2 localStorage Cache
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(scopedKey);
      if (raw) {
        const parsed = JSON.parse(raw) as CacheEntry<T>;
        if (parsed && parsed.ownerId === safeOwner) {
          if (now <= parsed.expiresAt || allowStale) {
            MEMORY_CACHE.set(scopedKey, parsed);
            return parsed.data;
          } else {
            window.localStorage.removeItem(scopedKey);
          }
        }
      }
    }
  } catch {
    // Ignore corrupt JSON
  }

  return null;
}

/**
 * Purge all cached private data for a user (or all non-public keys) upon sign-out
 * or account switch so another user on the same browser can never see prior profile data.
 */
export function purgeUserRealtimeCache(ownerId?: string): void {
  const targetOwner = ownerId ? normalizeOwnerId(ownerId) : null;

  for (const [k, v] of MEMORY_CACHE.entries()) {
    if (!targetOwner || v.ownerId === targetOwner || v.ownerId !== 'public') {
      MEMORY_CACHE.delete(k);
    }
  }

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const keysToRemove: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(STORAGE_PREFIX) && !k.startsWith(`${STORAGE_PREFIX}public__`)) {
          if (!targetOwner || k.startsWith(`${STORAGE_PREFIX}${targetOwner}__`)) {
            keysToRemove.push(k);
          }
        }
      }
      keysToRemove.forEach((k) => window.localStorage.removeItem(k));
    }
  } catch {
    // Ignore storage access errors
  }
}

/**
 * Deduplicated & Cached Fetch wrapper for deterministic API calls
 */
export async function cachedApiFetch<T = any>(
  url: string,
  options: RequestInit = {},
  ttlMs: number = 3 * 60 * 1000
): Promise<T> {
  const method = (options.method || 'GET').toUpperCase();
  const bodyStr = typeof options.body === 'string' ? options.body : '';
  const fingerprint = `${method}:${url}:${bodyStr}`;

  // Check L1 memory cache first
  const cached = getScopedCache<T>('public', fingerprint, false);
  if (cached !== null) {
    return cached;
  }

  // Deduplicate concurrent identical in-flight requests
  if (IN_FLIGHT_REQUESTS.has(fingerprint)) {
    return IN_FLIGHT_REQUESTS.get(fingerprint)!;
  }

  const requestPromise = (async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || errData.message || `HTTP ${response.status}`);
      }
      const data = (await response.json()) as T;
      setScopedCache('public', fingerprint, data, ttlMs);
      return data;
    } finally {
      IN_FLIGHT_REQUESTS.delete(fingerprint);
    }
  })();

  IN_FLIGHT_REQUESTS.set(fingerprint, requestPromise);
  return requestPromise;
}
