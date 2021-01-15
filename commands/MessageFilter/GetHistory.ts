import discord from "discord.js";
import { Json } from "../../util/Json";

export class GetHistory {
  private history: { username: string; word: string }[] = [];
  private adminRoleId = "723228470720856167";
  private command = "#gethistory";

  constructor(cli: discord.Client) {
    cli.on("message", (message) => {
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
        const history = this.GetHistory(username);
        message.reply(" ```json\n" + history + "\n``` ");
      }
    });
  }

  private GetHistory(username: string) {
    this.history = [];

    const file = JSON.parse(Json.Read(".config.json").toString());

    file.users.map((user: { username: string; word: string }) => {
      if (user.username == username) {
        this.history.push(user);
      }
    });

    return JSON.stringify(this.history);
  }
}
