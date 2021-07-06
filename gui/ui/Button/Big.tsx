import { FC } from "react";

type Props = {
	text: string;
};

export const BigButton: FC<Props> = ({ text }) => {
	return (
		<span className="inline-flex rounded-md shadow-sm">
			<button
				type="button"
				className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-white hover:bg-gray-300 focus:outline-none focus:border-gray-400 focus:shadow-outline-indigo active:bg-gray-400 transition ease-in-out duration-150"
			>
				<svg
					className="-ml-1 mr-3 h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
					<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
				</svg>
				{text}
			</button>
		</span>
	);
};
