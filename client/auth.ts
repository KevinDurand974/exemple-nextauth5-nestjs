import { request } from "@/utils/request";
import { signInSchema } from "@/utils/schemas";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			uuid: string;
			email: string;
			name: string;
			createdAt: string;
			updatedAt: string;
		};
		backendTokens: {
			accessToken: string;
			refreshToken: string;
			expiresIn: number;
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: {
			id: string;
			uuid: string;
			email: string;
			name: string;
			createdAt: string;
			updatedAt: string;
		};
		backendTokens: {
			accessToken: string;
			refreshToken: string;
			expiresIn: number;
		};
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Credentials({
			credentials: { email: {} },
			authorize: async (credentials) => {
				try {
					const { email } = await signInSchema.parseAsync(credentials);
					const { data } = await request({
						url: "auth/login",
						method: "POST",
						data: { email },
					});

					return data;
				} catch (err) {
					return null;
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) return { ...token, ...user };
			if (new Date().getTime() < token.backendTokens.expiresIn) return token;

			console.log("Refreshing token");

			const response = await request({
				url: "auth/refresh",
				method: "POST",
				headers: {
					Authorization: `Refresh ${token.backendTokens.refreshToken}`,
				},
			});

			return { ...token, backendTokens: response.data };
		},
		session: async ({ token, session }) => {
			session.user = { ...token.user, emailVerified: null };
			session.backendTokens = token.backendTokens;
			return session;
		},
		authorized: async ({ auth }) => !!auth,
	},
	pages: {
		signIn: "/sign",
	},
});
