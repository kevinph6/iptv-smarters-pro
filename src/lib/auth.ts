import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from "next/headers"
import { db } from "@/db";

// Resolve auth base URL: prefer BETTER_AUTH_URL unless it points at
// localhost while a real production URL exists (common misconfiguration).
const _configured = process.env.BETTER_AUTH_URL;
const _publicUrl  = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL;
const _isLocal    = !_configured || /localhost|127\.0\.0\.1/.test(_configured);

const baseURL = (_configured && !_isLocal)
	? _configured
	: (_publicUrl?.startsWith('https://') ? _publicUrl : (_configured || 'http://localhost:3000'));

const isProduction = baseURL.startsWith('https://');
   
export const auth = betterAuth({
	baseURL,
	database: drizzleAdapter(db, {
		provider: "sqlite",
	}),
	emailAndPassword: {    
		enabled: true
	},
	trustedOrigins: [
		"http://localhost:3000",
		"http://localhost:3001",
		"http://localhost:3003",
		"https://officieliptvsmarterspro.fr",
		"https://www.officieliptvsmarterspro.fr",
		"https://*.proxy.daytona.works",
		"https://*.orchids.page",
	],
	user: {
		additionalFields: {
			role: {
				type: "string",
				required: false,
				defaultValue: "writer",
				input: false,
			}
		}
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7,
		updateAge: 60 * 60 * 24,
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5
		}
	},
	advanced: {
		useSecureCookies: isProduction,
		crossSubDomainCookies: isProduction
			? { enabled: true, domain: ".officieliptvsmarterspro.fr" }
			: { enabled: false },
		defaultCookieAttributes: {
			sameSite: "lax",
			secure: isProduction,
			path: "/",
			httpOnly: true,
		}
	}
});

export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user || null;
}
