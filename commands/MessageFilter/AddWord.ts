import discord from "discord.js";

export class AddWord {
  private PREFIX = "#";

  constructor(cli: discord.Client) {
    cli.on("message", (message) => {
      const content = message.content;
      const cmd = content.split("!")[1];

      if (cmd != this.PREFIX) return;
    });
  }
}
