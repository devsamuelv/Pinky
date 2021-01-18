import discord from "discord.js";
import { Json } from "../../util/Json";

export class Blocklist {
  private command = "#blocklist";
  private wordlist: string[] = [];

  private modRoleId = "631240392779759628";
  private adminRoleId = "723228470720856167";

  constructor(cli: discord.Client) {
    cli.on("message", (message) => {
      if (!message.toString().includes(this.command)) return;

      const authorRoles = message.member?.roles.cache;

      if (authorRoles == null) return;

      for (var i = 0; i != authorRoles.array().length; i++) {
        const role = authorRoles.array()[i];
        const id = role.id;

        if (id == this.adminRoleId || id == this.modRoleId) {
          const file = JSON.parse(Json.Read("config.json").toString());

          this.wordlist = file.words;

          return message.reply(
            " ```\n# Blocklist\n " +
              this.wordlist.map((word) => {
                return `\n${word}`;
              }) +
              " \n``` "
          );
        }
      }

      return message.reply(`Im Sorry you dont have an admin or mod role!`);
    });
  }
}
