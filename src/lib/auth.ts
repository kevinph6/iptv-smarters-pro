import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from "next/headers"
import { db } from "@/db";

const isProduction = process.env.NODE_ENV === 'production';
 
export const auth = betterAuth({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
	database: drizzleAdapter(db, {
		provider: "sqlite",
	}),
	emailAndPassword: {    
		enabled: true
	},
	trustedOrigins: [
		"http://localhost:3000",
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
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5
		}
	},
	advanced: {
		crossSubDomainCookies: {
			enabled: false,
		},
		defaultCookieAttributes: {
			sameSite: "none",
			secure: true,
			path: "/",
		}
	}
});

export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user || null;
}