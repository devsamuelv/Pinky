import discord, { Channel, Guild, MessageMentions } from "discord.js";
import { db } from "../../db/db";
import { MessageFilter } from "./Filter";

export class AddWord {
	private modRoleId = "631240392779759628";
	private adminRoleId = "723228470720856167";
	private command = "#addword";

	constructor(cli: discord.Client) {
		cli.on("message", async (message) => {
			if (!message.toString().includes(this.command)) return;

			const content = message.content.toLowerCase();
			const pre = content.split(this.command)[1];
			const arg = pre.split(" ");

			const word = arg[1];
			const authorRoles = message.member?.roles.cache;

			if (message.guild == null) return message.reply("Channel Guild is Null");

			if (authorRoles == null) return;

			if (word.toLowerCase() == "help") return;

			authorRoles?.forEach(async (role) => {
				if (
					role.id == this.modRoleId ||
					role.id == this.adminRoleId ||
					role.id == "681326153969172529"
				) {
					const isBlocklistResult = await this.InBlocklist(word);

					if (isBlocklistResult == true)
						return message.reply("That Word is already in the blocklist");

					this.Addword(word);
					message.reply(`${word} was added to the blocklist`);
				}
			});
		});
	}

	private async MentionIsUser(
		mentions: MessageMentions,
		channel: Channel,
		guild: Guild
	) {
		const channelId = channel.id;
		const users = guild.channels.cache.get(channelId)?.members;

		mentions.users?.map((m) => {
			console.log(m);
		});

		if (users == null) return false;

		if (mentions.members == null) return false;

		for (var i = 0; i != mentions.users.array().length; i++) {
			const mention = mentions.users.array()[i];

			console.log(mention);

			// for (var i = 0; i != users.array().length; i++) {
			//   const user = users.array()[i];

			//   if (user. == mention.id) {
			//     return true;
			//   }
			// }
		}

		return false;
	}

	private InBlocklist = (word: string) =>
		new Promise<boolean>(async (resolve) => {
			const blocklist = await db.blocklist.Get();

			for (var i = 0; i != blocklist.length; i++) {
				const blockedWord = blocklist[i].word;

				if (blockedWord == word) return resolve(true);
			}

			return resolve(false);
		});

	private async Addword(word: string) {
		await db.blocklist.Add(word);

		MessageFilter.filter.addWords(word);
	}
}
