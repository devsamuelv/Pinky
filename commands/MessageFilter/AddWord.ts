import discord from "discord.js";
import { db } from "../../db/db";
import { MessageFilter } from "./Filter";

export class AddWord {
  private modRoleId = "631240392779759628";
  private adminRoleId = "723228470720856167";
  private command = "#addword";

  constructor(cli: discord.Client) {
    cli.on("message", async (message) => {
      if (!message.toString().includes(this.command)) return;

      const content = message.content;
      const pre = content.split(this.command)[1];
      const arg = pre.split(" ");

      const word = arg[1];
      const authorRoles = message.member?.roles.cache;

      if (authorRoles == null) return;

      if (word.toLowerCase() == "help") return;

      authorRoles?.forEach((role) => {
        if (
          role.id == this.modRoleId ||
          role.id == this.adminRoleId ||
          role.id == "681326153969172529"
        ) {
          this.Addword(word);
          message.reply(`${word} was added to the blocklist`);
        }
      });
    });
  }

  private async Addword(word: string) {
    await db.blocklist.Add(word);

    MessageFilter.filter.addWords(word);
  }
}
