"use client"
import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { useEffect, useState, useCallback } from "react"
import type { auth } from "./auth"

const SESSION_STORAGE_KEY = 'better-auth-session';

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
  fetchOptions: {
    credentials: 'include',
  },
});

type Session = {
  user: {
    id: string;
    email: string;
    name: string;
    role?: string;
  };
  session: {
    id: string;
    expiresAt: Date;
  };
} | null;

type SessionState = {
  data: Session;
  isPending: boolean;
  error: Error | null;
  refetch: () => void;
};

function saveSessionToStorage(session: Session) {
  if (typeof window !== 'undefined' && session) {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch {}
  }
}

function getSessionFromStorage(): Session {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.session?.expiresAt) {
          const expiresAt = new Date(parsed.session.expiresAt);
          if (expiresAt > new Date()) {
            return parsed;
          }
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
    } catch {}
  }
  return null;
}

function clearSessionFromStorage() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {}
  }
}

export function useSession(): SessionState {
  const [session, setSession] = useState<Session>(() => getSessionFromStorage());
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSession = useCallback(async () => {
    setIsPending(true);
    setError(null);
    
    // First check localStorage for immediate response
    const storedSession = getSessionFromStorage();
    if (storedSession) {
      setSession(storedSession);
    }
    
    try {
      const res = await authClient.getSession();
      if (res.data) {
        setSession(res.data as Session);
        saveSessionToStorage(res.data as Session);
      } else if (!storedSession) {
        // Only clear if no stored session and no API session
        setSession(null);
      }
    } catch (err) {
      // On error, keep using stored session if available
      if (!storedSession) {
        setSession(null);
        setError(err as Error);
      }
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return { data: session, isPending, error, refetch: fetchSession };
}

export { clearSessionFromStorage };
