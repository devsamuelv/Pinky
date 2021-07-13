import { createClient } from "@supabase/supabase-js";

export const useSupabase = () => {
	const supabase = createClient(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_KEY!
	);

	const getSessionFromUrl = supabase.auth.getSessionFromUrl;

	const Login = () => {
		supabase.auth.signIn({
			provider: "discord",
		});
	};

	return {
		Login,
		getSessionFromUrl,
	};
};
