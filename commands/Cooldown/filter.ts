import discord from "discord.js";
import { db } from "../../db/db";

export class CooldownFilter {
	private frozenUsers: IFrozenUser[] = [];
	private adminRoleId = "723228470720856167";

	constructor(cli: discord.Client) {
		// cli.on("message", async (message) => {
		// 	const author = message.author.username.toLowerCase();
		// 	const frozenUsers = await db.freeze.Get();
		// 	this.frozenUsers = frozenUsers;
		// 	for (var i = 0; i != this.frozenUsers.length; i++) {
		// 		if (this.frozenUsers[i].username == null) return;
		// 		const user = this.frozenUsers[i].username.toLowerCase();
		// 		if (author == user) {
		// 			if (user == "pinky" || user == "devsamuelv" || user == "crew") return;
		// 			const usrRoles = message.guild?.members.cache
		// 				.find((usr) => usr.user.username == user)
		// 				?.roles.cache.array();
		// 			if (usrRoles == null)
		// 				return message.reply("user roles null can't Filter message's");
		// 			for (var i = 0; i != usrRoles?.length; i++) {
		// 				// const _role = usrRoles[i];
		// 				// if (_role.id == this.adminRoleId) return;
		// 			}
		// 			if (!message.deletable) return;
		// 			message.author
		// 				.createDM()
		// 				.then((channel) => channel.send("Your Frozen 🥶"))
		// 				.catch((err) => console.log(`${err.message} ${author}`));
		// 			return message.delete();
		// 		}
		// 	}
		// });
	}
}
