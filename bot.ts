import discord from "discord.js";
import { Command } from "./commands/Command";
import { Watchers } from "./watchers/watchers";

require("dotenv").config();

const token = process.env.TOKEN!;

const cli = new discord.Client({
	presence: {
		activity: {
			name: "The Pink Alliance",
			type: "WATCHING",
		},
	},
});

cli.setMaxListeners(100);

new Command(cli);
new Watchers(cli);

if (token == null)
	throw new Error("There is no available token in your enviroment");

cli
	.login(token)
	.then(() => {
		console.log(`Pinky is Running`);
	})
	.catch((err) => {
		throw new Error(err.message);
	});
