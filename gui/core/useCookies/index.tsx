import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { parseCookies, destroyCookie, setCookie } from "nookies";

export const useCookies = () => {
	const createCookie = (
		name: string,
		value: string,
		options?: any,
		ctx?:
			| Pick<NextPageContext, "res">
			| {
					res: NextApiResponse<any>;
			  }
			| {
					res: any;
			  }
			| null
			| undefined
	) => setCookie(ctx, name, value, options);

	const getCookies = (
		ctx?:
			| Pick<NextPageContext, "req">
			| {
					req: NextApiRequest;
			  }
			| {
					req: any;
			  }
			| null
			| undefined,
		options?: any
	) => parseCookies(ctx, options);

	const deleteCookie = (
		name: string,
		ctx?:
			| Pick<NextPageContext, "res">
			| { res: NextApiResponse<any> }
			| { res: any }
			| null
			| undefined,
		options?: any
	) => destroyCookie(ctx, name, options);

	return {
		createCookie,
		getCookies,
		deleteCookie,
	};
};
