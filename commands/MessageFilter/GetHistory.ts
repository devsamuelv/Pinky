import discord from "discord.js";
import { db } from "../../db/db";

export class GetHistory {
  private adminRoleId = "723228470720856167";
  private command = "#gethistory";

  constructor(cli: discord.Client) {
    cli.on("message", async (message) => {
      if (!message.toString().includes(this.command)) return;

      const content = message.content;
      const pre = content.split(this.command)[1];
      const arg = pre.split(" ");

      const username = arg[1];
      const author = message.author.username;
      const authorRoles = message.member?.roles.cache;

      if (authorRoles == null) return;

      if (author == "Pinky" || author == "Pinky Dev") return;
      if (username.toLowerCase() == "help") return;

      const isAdmin = authorRoles?.map((role) => {
        if (role.id == this.adminRoleId) return true;

        return false;
      });

      if (isAdmin) {
        const history = await this.GetHistory(username);
        message.reply(author + " History ```json\n" + history + "\n``` ");
      }
    });
  }

  private async GetHistory(username: string) {
    const history = await db.blocklist.History.Get(username);

    return JSON.stringify(history);
  }
}
