'use client'

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

const Session = ({ children }: Props) => {
	return (
		<SessionProvider>{children}</SessionProvider>
	);
};

export default Session;
