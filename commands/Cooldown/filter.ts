import discord from "discord.js";
import { db } from "../../db/db";

export class CooldownFilter {
  private frozenUsers: IFrozenUser[] = [];

  constructor(cli: discord.Client) {
    cli.on("message", async (message) => {
      const author = message.author.username.toLowerCase();
      const frozenUsers = await db.freeze.Get();

      this.frozenUsers = frozenUsers;

      for (var i = 0; i != this.frozenUsers.length; i++) {
        const user = this.frozenUsers[i].username.toLowerCase();

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
