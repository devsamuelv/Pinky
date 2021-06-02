import { Client } from "discord.js";

export class RolesWatcher {
	constructor(cli: Client) {
		cli.on("roleDelete", (role) => {
			role.guild.roles.create({ data: role }).catch((err) => console.log(err));
		});

		cli.on("roleCreate", (role) => {
			role.delete();
		});
	}
}
