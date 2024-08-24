declare namespace NodeJS {
	export type ProcessEnv = {
		DATABASE_URL: string;
		JWT_SECRET: string;
		JWT_REFRESH_SECRET: string;
	};
}
