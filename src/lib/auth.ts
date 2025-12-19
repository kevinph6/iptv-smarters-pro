import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from "next/headers"
import { db } from "@/db";

// Detect environment more accurately
const isLocalhost = typeof window !== 'undefined' 
    ? window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    : process.env.NODE_ENV === 'development' || !process.env.VERCEL;

const baseURL = process.env.BETTER_AUTH_URL || 
                (isLocalhost ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_BASE_URL) || 
                'http://localhost:3000';

const isSecure = baseURL.startsWith('https://');
   
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
		"https://abonnement-iptv-smarterspro.fr",
		"https://www.abonnement-iptv-smarterspro.fr",
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
		useSecureCookies: isSecure,
		crossSubDomainCookies: {
			enabled: true,
		},
		defaultCookieAttributes: {
			sameSite: isSecure ? "none" : "lax",
			secure: isSecure,
			path: "/",
			httpOnly: true,
			partitioned: isSecure,
		}
	}
});

export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user || null;
}
