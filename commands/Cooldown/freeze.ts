import discord from "discord.js";
import { db } from "../../db/db";
import { Json } from "../../util/Json";

export class Freeze {
	private command = "#freeze";
	private frozenUsers: string[] = [];

	private modRoleId = "631240392779759628";
	private adminRoleId = "723228470720856167";

	constructor(cli: discord.Client) {
		cli.on("message", async (message) => {
			if (!message.toString().includes(this.command)) return;

			const content = message.content;
			const pre = content.split(this.command)[1];
			const arg = pre.split(" ");

			const user = arg[1];
			const authorRoles = message.member?.roles.cache;

			if (authorRoles == null) return message.reply("You Don't have any roles");

			if (content.includes("#help")) return;

			for (var i = 0; i != authorRoles.array().length; i++) {
				const role = authorRoles.array()[i];
				const id = role.id;

				if (
					id == this.adminRoleId ||
					id == this.modRoleId ||
					id == "681326153969172529"
				) {
					const frozenUsers = await db.freeze.Get();

					for (var i = 0; i != frozenUsers.length; i++) {
						const frUser = this.frozenUsers[i];

						if (user == frUser)
							return message.reply(`${user} is already frozen!`);
					}

					if (user == "pinky" || user == "developer" || user == "crew") {
						return message.reply("no");
					}

					await db.freeze.Add(user);

					return message.reply(`${user} is now frozen 🥶`);
				}
			}

			return message.reply(
				"Im Sorry you don't have the roles to freeze someone."
			);
		});
	}
}
