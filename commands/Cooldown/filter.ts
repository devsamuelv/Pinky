import discord from "discord.js";
import { Json } from "../../util/Json";

export class CooldownFilter {
  private frozenUsers: string[] = [];

  constructor(cli: discord.Client) {
    cli.on("message", (message) => {
      const author = message.author.username.toLowerCase();
      const file = JSON.parse(Json.Read("config.json").toString());

      if (file.frozenUsers == null) {
        file.frozenUsers = [];

        Json.Write("config.json", JSON.stringify(file));
      }

      this.frozenUsers = file.frozenUsers;

      for (var i = 0; i != this.frozenUsers.length; i++) {
        const user = this.frozenUsers[i].toLowerCase();

        if (author == user) {
          if (!message.deletable) return;

          message.author
            .createDM()
            .then((channel) => channel.send("Your Frozen 🥶"))
            .catch((err) => console.log(`${err.message} ${author}`));

          return message.delete();
        }
      }
    });
  }
}
