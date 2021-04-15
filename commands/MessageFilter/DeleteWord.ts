import discord from "discord.js";
import { db } from "../../db/db";
import { MessageFilter } from "./Filter";

export class DeleteWord {
	private adminRoleId = "723228470720856167";
	private modRoleId = "631240392779759628";
	private command = "#deleteword";

	constructor(cli: discord.Client) {
		cli.on("message", (message) => {
			if (!message.toString().includes(this.command)) return;

			const content = message.content;
			const pre = content.split(this.command)[1];
			const arg = pre.split(" ");

			const word = arg[1];
			const author = message.author.username;
			const authorRoles = message.member?.roles.cache;

			if (authorRoles == null) return;

			if (author == "Pinky" || author == "Pinky Dev") return;
			if (word.toLowerCase() == "help") return;

			authorRoles?.forEach((role) => {
				if (
					role.id == this.adminRoleId ||
					role.id == this.modRoleId ||
					role.id == "681326153969172529"
				) {
					this.DeleteWord(word);
					message.reply(`${word} has been removed from the blocklist`);
				}
			});
		});
	}

	private async DeleteWord(word: string) {
		await db.blocklist.Remove(word);

		MessageFilter.filter.removeWords(word);
	}
}
