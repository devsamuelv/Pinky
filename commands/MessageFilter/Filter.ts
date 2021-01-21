import discord from "discord.js";
import Filter from "bad-words";
import { Json } from "../../util/Json";

export class MessageFilter {
  public static filter = new Filter();
  private curseCount: { username: string; word: string }[] = [];

  constructor(cli: discord.Client) {
    // * add proper data santization
    // * fixed the character issue

    this.Init();

    cli.on("message", (message) => {
      const author = message.author.username;
      const content = message.content;

      var count: number = 0;

      if (author == "Pinky" || author == "Pinky Dev") return;

      if (content.includes("#addword")) return;
      if (content.includes("#deleteword")) return;

      if (MessageFilter.filter.isProfane(content)) {
        const file = JSON.parse(Json.Read("config.json").toString());

        this.curseCount = file.users;

        this.curseCount.forEach((user) => {
          if (user.username == author) {
            count++;
          }
        });

        if (count > 10) {
          message.reply(
            `you know im going to delete your messages anyway :rolling_eyes:`
          );
        } else if (count > 5) {
          message.reply(
            `HOW MANY TIMES DO I HAVE TO TELL YOU STOP CURSING!!!!!`
          );
        } else if (count < 5) {
          message.reply(`stop cursing`);
        }

        this.curseCount.push({
          username: author,
          word: content,
        });

        file.users = this.curseCount;

        Json.Write("config.json", JSON.stringify(file));

        if (message.deletable) {
          message.delete();
        }
      }
    });
  }

  private Init() {
    const file = JSON.parse(Json.Read("config.json").toString());

    file.words.forEach((word: string) => MessageFilter.filter.addWords(word));
  }
}
