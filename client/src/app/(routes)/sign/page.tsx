import { signIn } from "@base/auth";

type Props = {
	searchParams: {
		callbackUrl?: string
	}
};

const SignPage = ({ searchParams }: Props) => {
	const callbackUrl = searchParams.callbackUrl || "/home";

	return (
		<form action={async (formdata) => {
			"use server"
			await signIn("credentials", { email: formdata.get("email"), redirectTo: callbackUrl });
		}}>
			<label>
				Email
				<input type="email" name="email" className="text-black" />
			</label>

			<button>Sign in</button>
		</form>
	);
}

export default SignPage;
