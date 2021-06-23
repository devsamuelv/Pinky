import discord, { Message } from "discord.js";
import Filter from "bad-words";
import { db } from "../../db/db";
import { Tranlator } from "../../Translator/Translator";
import { Rec } from "../../db/types/List";

export class MessageFilter {
	public static filter = new Filter({
		regex: /\*|\.|$/gi,
		replaceRegex: /[A-Za-z0-9가-힣_]/g,
	});

	private curseCount: IHistoryEntry[] = [];
	private StopCussingVideo = "https://www.youtube.com/watch?v=D7JmlWbnMgc";

	constructor(cli: discord.Client) {
		// * add proper data santization
		// * fixed the character issue

		this.Init();

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
					content = await Tranlator.en.Translate(content);
				}
			}

			const history = await db.blocklist.History.Get(username);

			var count: number = 0;

			if (username == "Pinky" || username == "Pinky Dev") return;

			if (content.includes("#addword")) return;
			if (content.includes("#deleteword")) return;

			if (MessageFilter.filter.isProfane(content)) {
				history.forEach((user) => {
					if (user.username == username) {
						count++;
					}
				});

				if (count > 10) {
					message.reply(
						`you know im going to delete your messages anyway :rolling_eyes:`
					);
				} else if (count > 5) {
					message.reply(
						`HOW MANY TIMES DO I HAVE TO TELL YOU STOP CURSING!!!!!`
					);
				} else if (count < 5) {
					message.reply(`stop cursing`);
				}

				this.curseCount.push({
					username: username,
					message: content,
				});

				if (message.deletable) {
					message.delete();
				}
			}
		});

		cli.on("message", async (message) => {
			if (message.content == null || message.author == null) return;

			this.CreateList(message);

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
					content = await Tranlator.en.Translate(content);
				}
			}

			const history = await db.blocklist.History.Get(username);

			var count: number = 0;

			if (username == "Pinky" || username == "Pinky Dev") return;

			if (content.includes("#addword")) return;
			if (content.includes("#deleteword")) return;

			if (content.includes("tenor.com")) {
				if (message.deletable) {
					message.delete();
				}
			}

			if (MessageFilter.filter.isProfane(content)) {
				history.forEach((user) => {
					if (user.username == username) {
						count++;
					}
				});

				if (count > 20) {
					const dm = await message.author.createDM();

					dm.send(this.StopCussingVideo);
				} else if (count > 10) {
					const dm = await message.author.createDM();

					dm.send(
						`you know im going to delete your messages anyway :rolling_eyes:`
					);
				} else if (count > 5) {
					const dm = await message.author.createDM();

					dm.send(`HOW MANY TIMES DO I HAVE TO TELL YOU STOP CURSING!!!!!`);
				} else if (count < 5) {
					message.reply(`stop cursing`);
				}

				this.curseCount.push({
					username: username,
					message: content,
				});

				if (message.deletable) {
					message.delete();
				}
			}
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

	private async Init() {
		const list = await db.blocklist.Get();

		MessageFilter.filter.removeWords("crap");
		MessageFilter.filter.removeWords("god");
		MessageFilter.filter.removeWords("screw");
		MessageFilter.filter.removeWords("butt");

		list.forEach((l) => MessageFilter.filter.addWords(l.word));
	}
}
