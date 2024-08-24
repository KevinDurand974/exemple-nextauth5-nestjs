"use server";

import { request } from "@base/src/utils/request";
import { AxiosError } from "axios";

export const register = async (data: { email: string; name: string }) => {
	try {
		const res = await request({
			url: "/auth/register",
			method: "POST",
			data,
		});
		return res.data;
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			throw new Error(err.response?.data.message);
		}
		throw err;
	}
};
