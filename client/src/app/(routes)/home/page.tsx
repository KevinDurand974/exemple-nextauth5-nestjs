import { auth, signOut } from "@base/auth";
import { request } from "@base/src/utils/request";

type Props = {};

const home = async (props: Props) => {
	const session = (await auth())!

	let data = null

	try {
		const response = await request({ url: `user/${session.user.uuid}`, method: 'GET', headers: { Authorization: `Bearer ${session.backendTokens.accessToken}` } })
		data = response.data
	} catch (err: any) {
		console.error('ERROR', err.message);
	}

	return (
		<div>
			<h1>Home</h1>

			<pre>{JSON.stringify(data, null, 4)}</pre>

			<form action={async () => {
				"use server"

				await signOut({ redirectTo: '/sign' });
			}}>
				<button>Sign out</button>
			</form>
		</div>
	);
}

export default home;
