import discord from "discord.js";
import { db } from "../../db/db";

export class UnFreeze {
  private command = "#thaw";

  private modRoleId = "631240392779759628";
  private adminRoleId = "723228470720856167";

  constructor(cli: discord.Client) {
    cli.on("message", async (message) => {
      if (!message.toString().includes(this.command)) return;

      const content = message.content;
      const pre = content.split(this.command)[1];
      const arg = pre.split(" ");

      const user = arg[1];
      const authorRoles = message.member?.roles.cache;

      if (authorRoles == null) return message.reply("You Don't have any roles");

      if (content.includes("#help")) return;

      for (var i = 0; i != authorRoles.array().length; i++) {
        const role = authorRoles.array()[i];
        const id = role.id;

        if (
          id == this.adminRoleId ||
          id == this.modRoleId ||
          id == "681326153969172529"
        ) {
          await db.freeze.Remove(user);

          return message.reply(`${user} was unfrozen.`);
        }
      }

      return message.reply(
        "Im Sorry you don't have the roles to unfreeze someone."
      );
    });
  }
}
