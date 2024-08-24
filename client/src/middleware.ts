export { auth as middleware } from "@base/auth";

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
