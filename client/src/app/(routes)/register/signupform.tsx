'use client'

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { register } from "./action";

type Props = {};

const SignUpForm = (props: Props) => {
	const router = useRouter()

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formdata = new FormData(event.currentTarget);

		try {
			await register({ email: formdata.get("email") as string, name: formdata.get("name") as string });
			router.push('/sign')
		} catch (err: any) {
			console.error(err)
		}

	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Email
				<input type="email" name="email" className="text-black" />
			</label>
			
			<label>
				Name
				<input type="text" name="name" className="text-black" />
			</label>

			<button>Sign in</button>
		</form>
	);
}

export default SignUpForm;
