import discord from "discord.js";
import { Json } from "../../util/Json";

export class Freeze {
  private command = "#freeze";
  private frozenUsers: string[] = [];

  private modRoleId = "631240392779759628";
  private adminRoleId = "723228470720856167";

  constructor(cli: discord.Client) {
    cli.on("message", (message) => {
      if (!message.toString().includes(this.command)) return;

      const content = message.content;
      const pre = content.split(this.command)[1];
      const arg = pre.split(" ");

      const user = arg[1];
      const authorRoles = message.member?.roles.cache;

      if (authorRoles == null) return message.reply("You Don't have any roles");

      for (var i = 0; i != authorRoles.array().length; i++) {
        const role = authorRoles.array()[i];
        const id = role.id;

        if (
          id == this.adminRoleId ||
          id == this.modRoleId ||
          id == "681326153969172529"
        ) {
          const file = JSON.parse(Json.Read("config.json").toString());

          this.frozenUsers = file.frozenUsers;

          for (var i = 0; i != this.frozenUsers.length; i++) {
            const frUser = this.frozenUsers[i];

            if (user == frUser)
              return message.reply(`${user} is already frozen!`);
          }

          this.frozenUsers.push(user);

          file.frozenUsers = this.frozenUsers;

          Json.Write("config.json", JSON.stringify(file));

          return message.reply(`${user} is now frozen 🥶`);
        }
      }

      return message.reply(
        "Im Sorry you don't have the roles to freeze someone."
      );
    });
  }
}
