import BadWordsFilter from "bad-words";
import discord from "discord.js";
import Filter from "bad-words";
import { Json } from "../../util/Json";

export class MessageFilter {
  private filter = new Filter({
    list: [
      "assman",
      "r3tard",
      "fck",
      "gay",
      "titty",
      "fuuck",
      "shiit",
      "fuq",
      "retat",
      "retarded",
      "dumbass",
    ],
  });
  private curseCount: { username: string; word: string }[] = [];

  constructor(cli: discord.Client) {
    cli.on("message", (message) => {
      const author = message.author.username;
      const content = message.content;

      var count: number = 0;

      if (author == "Pinky") return;

      if (this.filter.isProfane(content)) {
        const file = JSON.parse(Json.Read(".config.json").toString());

        this.curseCount = file.users;

        this.curseCount.forEach((user) => {
          if (user.username == author) {
            count++;
          }
        });

        console.log(count);

        if (count > 5) {
          message.reply(
            `HOW MANY TIMES DO I HAVE TO TELL YOU STOP CURSING!!!!!`
          );
        } else {
          message.reply(`stop cursing`);
        }

        this.curseCount.push({
          username: author,
          word: content,
        });

        file.users = this.curseCount;

        Json.Write(".config.json", JSON.stringify(file));

        if (message.deletable) {
          message.delete();
        }
      }
    });
  }
}
