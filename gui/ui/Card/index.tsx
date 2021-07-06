import { FC } from "react";

export const Card: FC = ({ children }) => {
	return <div className="bg-white p-3 rounded-md">{children}</div>;
};
