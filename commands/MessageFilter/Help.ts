import discord from "discord.js";

export class MessageHelp {
  constructor(cli: discord.Client) {
    cli.on("message", (message) => {
      if (!message.toString().includes("#addword")) return;

      const content = message.content;
      const pre = content.split("#addword")[1];
      const arg = pre.split(" ");

      if (arg[1].toLowerCase() == "help") {
        message.reply(
          "`#addword [WORD TO BAN]` **you need to be a Moderator to use this**."
        );
      }
    });
  }
}
