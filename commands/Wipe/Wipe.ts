import discord from "discord.js";

export class WipeChannel {
  private modRole = "631240392779759628";
  private adminRole = "723228470720856167";
  private command = "#wipe";

  constructor(cli: discord.Client) {
    cli.on("message", async (message) => {
      if (!message.content.includes(this.command)) return;

      const pre = message.content.split(this.command)[1];
      const arg = pre.split(" ");

      const messageAmount = Number(arg[1]) + 1;

      const author = message.author;
      const roles = message.member?.roles.cache;

      if (author.username == "Pinky" || author.username == "Pinky Dev") return;

      for (var i = 0; i != roles?.array().length; i++) {
        const role = roles?.array()[i];
        const id = role?.id;

        if (
          id == this.adminRole ||
          id == this.modRole ||
          id == "681326153969172529"
        ) {
          const _channel = message.channel.messages;

          const messages = (await _channel.fetch()).array();

          for (var i = 0; i != messageAmount; i++) {
            const msg = messages[i];

            if (msg == null) return;

            if (msg.deletable) {
              msg.delete();
            }
          }

          return;
        }
      }

      return message.reply("You Don't Have The Required Roles");
    });
  }
}
