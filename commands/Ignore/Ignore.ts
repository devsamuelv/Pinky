import { Client } from "discord.js";
import { db } from "../../db/db";

export class Ignore {
  private command = "#ignore";
  private modRoleId = "631240392779759628";
  private adminRoleId = "723228470720856167";

  constructor(cli: Client) {
    cli.on("message", async (message) => {
      if (!message.toString().includes(this.command)) return;

      const roles = message.member?.roles.cache;

      if (roles == null) return message.reply("Role Error!");

      for (var i = 0; i != roles.array().length; i++) {
        const id = roles.array()[i].id;

        if (
          id == this.adminRoleId ||
          id == this.modRoleId ||
          id == "681326153969172529"
        ) {
          const channelId = message.channel.id;

          const doc = await db.ignore.Add(channelId);

          if (doc == null) {
            return message.reply(
              "An Error Occured With Ignoring this Channel!"
            );
          }

          return message.reply(`:thumbsup: channel Ignored`);
        }
      }

      return message.reply("Your Not an Admin or mod!");
    });
  }
}
