import discord, { Message } from "discord.js";
// import Filter from "bad-words";
import { db } from "../../db/db";
import { Tranlator } from "../../Translator/Translator";
import { Rec } from "../../db/types/List";

export class MessageFilter {
	constructor(cli: discord.Client) {
		cli.on("messageUpdate", async (_, message) => {
			if (message.content == null || message.author == null) return;

			const channelId = message.channel.id;
			const ignoredChannels = await db.ignore.Get();

			for (var i = 0; i != ignoredChannels.length; i++) {
				const id = ignoredChannels[i].channelId;

				if (channelId == id) return;
			}

			const author = message.author;
			const username = author.username;
			const tag = author.tag;
			const watchedUsers = await db.watch.Get();
			var content = message.content;

			for (var i = 0; i != watchedUsers.length; i++) {
				const user = watchedUsers[i];
				const userAndTag = `${tag}`;

				if (user.UsernameAndTag == userAndTag) {
					try {
						content = await Tranlator.en.Translate(content);
					} catch (err) {
						console.log(err);
					}
				}
			}

			const history = await db.blocklist.History.Get(username);

			var count: number = 0;

			if (username == "Pinky" || username == "Pinky Dev") return;

			if (content.includes("#addword")) return;
			if (content.includes("#deleteword")) return;

			// if (MessageFilter.filter.isProfane(content)) {
			// 	history.forEach((user) => {
			// 		if (user.username == username) {
			// 			count++;
			// 		}
			// 	});

			// 	if (count > 10) {
			// 		message.reply(
			// 			`you know im going to delete your messages anyway :rolling_eyes:`
			// 		);
			// 	} else if (count > 5) {
			// 		message.reply(
			// 			`HOW MANY TIMES DO I HAVE TO TELL YOU STOP CURSING!!!!!`
			// 		);
			// 	} else if (count < 5) {
			// 		message.reply(`stop cursing`);
			// 	}

			// 	this.curseCount.push({
			// 		username: username,
			// 		message: content,
			// 	});

			// 	if (message.deletable) {
			// 		message.delete();
			// 	}
			// }
		});

		cli.on("message", async (message) => {
			if (message.content == null || message.author == null) return;

			this.CreateList(message);

			const channelId = message.channel.id;
			const ignoredChannels = await db.ignore.Get();

			// if the current channel is in the ignored list return
			for (var i = 0; i != ignoredChannels.length; i++) {
				const id = ignoredChannels[i].channelId;

				if (channelId == id) return;
			}

			const author = message.author;
			const username = author.username;
			const tag = author.tag;
			const watchedUsers = await db.watch.Get();
			var content = message.content;

			for (var i = 0; i != watchedUsers.length; i++) {
				const user = watchedUsers[i];
				const userAndTag = `${tag}`;

				if (user.UsernameAndTag == userAndTag) {
					content = await Tranlator.en.Translate(content);
				}
			}

			const history = await db.blocklist.History.Get(username);
			const pastMessages = await db.list.Get(content);

			// Start: Rate Limter

			// for (var i = 0; i != pastMessages.length; i++) {
			// 	const _content = pastMessages[i].message;
			// 	const _createdAt = pastMessages[i];

			// 	if (content == _content) {
			// 		return message.delete();
			// 	}
			// }

			// End: Rate Limter

			var count: number = 0;

			if (username == "Pinky" || username == "Pinky Dev") return;
			if (author.id == "459517856154124289") return;

			const addToHistory = await db.list.Rec({
				author: author.username,
				channelId: channelId,
				id: author.id,
				message: content,
			});

			if (addToHistory.id == null)
				console.error("ADD TO HISTORY: result is undefined");

			if (content.includes("#addword")) return;
			if (content.includes("#deleteword")) return;

			// add sentiment for message scanning
		});
	}

	private CreateList(message: Message) {
		const _author = message.author.username;
		const _content = message.content;
		const _id = message.id;
		const _channel = message.channel.id;

		const List: Rec = {
			author: _author,
			message: _content,
			channelId: _channel,
			id: _id,
		};

		db.list.Rec(List);
	}

	private async ProtectNick(content: string, message: Message) {
		if (
			(content.includes("<@!584580976928096257>") && content.includes("job")) ||
			content.includes("nice") ||
			content.includes("good") ||
			content.includes("amazing") ||
			content.includes("great") ||
			content.includes("your") ||
			content.includes("doing")
		) {
			if (message.deletable) {
				message.delete();

				const channel = await message.author.createDM();

				return channel.send("DON'T INTERRUPT NICK HE IS WORKING :rage: ");
			}
		}
	}
}
