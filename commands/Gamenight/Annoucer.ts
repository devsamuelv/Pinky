import discord, { Channel, Client, Guild, MessageMentions } from "discord.js";
import { CronJob } from "cron";

export class Announcer {
	private ChannelId = "807268738684551209";

	constructor(cli: Client) {
		const channel = cli.channels.cache.get(this.ChannelId);

		// const job = new CronJob(
		// 	"1 33 14 * * 5",
		// 	() => {
		// 		if (channel == null) return;

		// 		cli.channels.cache.find;
		// 	},
		// 	null,
		// 	true,
		// 	"America/New_York"
		// );
	}
}
