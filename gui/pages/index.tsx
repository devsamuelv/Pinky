import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { BigButton } from "../ui/Button/Big";
import { Card } from "../ui/Card";

export default function Home() {
	return (
		<div className="bg-gray-300">
			<BigButton text="Login With Discord" />
		</div>
	);
}
