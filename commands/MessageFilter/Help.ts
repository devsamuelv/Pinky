import discord from "discord.js";

export class MessageHelp {
  constructor(cli: discord.Client) {
    cli.on("message", (message) => {
      if (!message.toString().includes("#help")) return;

      const content = message.content;
      const pre = content.split("#help")[1];
      const arg = pre.split(" ");

      message.reply(
        "`#addword [WORD TO BAN]` **you need to be a Moderator to use this**. \n" +
          "`#deleteword [WORD TO DELETE]` **you need to be a Moderator to use this**. \n" +
          "`#freeze [PERSON TO FREEZE]` **you need to be a Moderator to use this**. \n" +
          "`#thaw [PERSON TO THAW]` **you need to be a Moderator to use this**."
      );
    });
  }
}
