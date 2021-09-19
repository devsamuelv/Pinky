import { PLATFORM, STATUS } from ".prisma/client";
import { Client, PresenceStatus } from "discord.js";
import { v4 } from "uuid";
import { db } from "../../db/db";

export class Status {
	private pastTimestamp: Date = new Date();
	private pastUsername: string = "";

	constructor(bot: Client) {
		bot.on("presenceUpdate", (pastPre, pre) => {
			if (pre.member == null) return;

			const id = pre.member.id;
			const username = pre.member.user.username;
			const status: STATUS = this.convertStatus(pre.status);
			const timestamp = new Date();

			// if (
			// 	isSameSecond(this.pastTimestamp, timestamp) &&
			// 	username == this.pastUsername
			// )
			// 	return;

			console.log(pre.user?.username);

			db.status.Create({
				id: v4(),
				uid: id,
				username,
				online_status: status,
				platform_type: "DESKTOP",
				time_online: timestamp,
			});

			this.pastUsername = username;
			this.pastTimestamp = timestamp;
		});
	}

	private convertStatus(stat: PresenceStatus): STATUS {
		if (stat == "dnd") return STATUS.DND;

		if (stat == "idle") return STATUS.IDLE;

		if (stat == "invisible") return STATUS.INVISIBLE;

		if (stat == "offline") return STATUS.OFFLINE;

		if (stat == "online") return STATUS.ONLINE;

		return STATUS.OFFLINE;
	}
}
