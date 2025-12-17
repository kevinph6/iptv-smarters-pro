"use client"
import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { useEffect, useState, useCallback } from "react"
import type { auth } from "./auth"

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
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

export function useSession(): SessionState {
  const [session, setSession] = useState<Session>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSession = useCallback(async () => {
    setIsPending(true);
    setError(null);
    try {
      const res = await authClient.getSession();
      setSession(res.data as Session);
    } catch (err) {
      setSession(null);
      setError(err as Error);
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return { data: session, isPending, error, refetch: fetchSession };
}
