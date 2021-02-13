import discord from "discord.js";
import { db } from "../../db/db";

export class Blocklist {
  private command = "#blocklist";

  private modRoleId = "631240392779759628";
  private adminRoleId = "723228470720856167";

  constructor(cli: discord.Client) {
    cli.on("message", async (message) => {
      if (!message.toString().includes(this.command)) return;

      const authorRoles = message.member?.roles.cache;

      if (authorRoles == null) return;

      for (var i = 0; i != authorRoles.array().length; i++) {
        const role = authorRoles.array()[i];
        const id = role.id;

        if (
          id == this.adminRoleId ||
          id == this.modRoleId ||
          id == "681326153969172529"
        ) {
          const blocklist = await db.blocklist.Get();
          var list = blocklist.map((word) => {
            return `\n${word.word}`;
          });

          if (list.length == null || list.length == 0)
            return message.reply(
              "The Blocklist is Empty :disappointed_relieved:"
            );

          return message.reply(" ```\n# Blocklist\n " + list + " \n``` ");
        }
      }

      return message.reply(`Im Sorry you dont have an admin or mod role!`);
    });
  }
}
