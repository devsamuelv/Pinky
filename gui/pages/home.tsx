import { FC } from "react";
import { useCookies } from "../core/useCookies";
import { useSupabase } from "../core/useSupabase";

const home: FC = () => {
	const { getSessionFromUrl } = useSupabase();
	const {} = useCookies();

	getSessionFromUrl({
		storeSession: true,
	}).then(({ data, error }) => {
		// if (data.)
	});

	return <div></div>;
};

export default home;
