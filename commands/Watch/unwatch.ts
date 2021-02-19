import { Client } from "discord.js";
import { db } from "../../db/db";

export class UnWatch {
  private command = "#unwatch";
  private modRoleId = "631240392779759628";
  private adminRoleId = "723228470720856167";

  constructor(cli: Client) {
    cli.on("message", async (message) => {
      if (!message.toString().includes(this.command)) return;

      const roles = message.member?.roles.cache;

      const username = message.author.username;
      const uid = message.author.id;

      if (roles == null) return message.reply("Role Error!");

      for (var i = 0; i != roles.array().length; i++) {
        const id = roles.array()[i].id;

        if (
          id == this.adminRoleId ||
          id == this.modRoleId ||
          id == "681326153969172529"
        ) {
          await db.watch.Remove(uid);

          return message.reply(`${username} is now being watched :telescope:`);
        }
      }

      return message.reply("You Don't Have admin for mod roles");
    });
  }
}
