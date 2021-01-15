import discord from "discord.js";
import { Json } from "../../util/Json";
import { MessageFilter } from "./Filter";

export class AddWord {
  private CurseWords: string[] = [];

  private modRoleId = "631240392779759628";

  constructor(cli: discord.Client) {
    cli.on("message", (message) => {
      if (!message.toString().includes("#addword")) return;

      const content = message.content;
      const pre = content.split("#addword")[1];
      const arg = pre.split(" ");

      const word = arg[1];
      const authorRoles = message.member?.roles.cache;

      if (authorRoles == null) return;

      if (word.toLowerCase() == "help") return;

      if (authorRoles?.array().length < 0) {
        authorRoles?.forEach((role) => {
          console.log(role.name);

          if (role.id == this.modRoleId || role.id == "681326153969172529") {
            this.Addword(word);
          }
        });
      } else if (
        authorRoles.first()?.id == this.modRoleId ||
        authorRoles.first()?.id == "681326153969172529"
      ) {
        this.Addword(word);
      }
    });
  }

  private Addword(word: string) {
    const file = JSON.parse(Json.Read(".config.json").toString());

    this.CurseWords = file.words;

    this.CurseWords.push(word);

    MessageFilter.filter.addWords(word);

    file.words = this.CurseWords;

    Json.Write(".config.json", JSON.stringify(file));
  }
}
