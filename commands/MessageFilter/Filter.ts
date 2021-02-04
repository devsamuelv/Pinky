import discord from "discord.js";
import Filter from "bad-words";
import { db } from "../../db/db";
import { Tranlator } from "../../Translator/Translator";

export class MessageFilter {
  public static filter = new Filter();
  private curseCount: IHistoryEntry[] = [];

  constructor(cli: discord.Client) {
    // * add proper data santization
    // * fixed the character issue

    this.Init();

    cli.on("messageUpdate", async (_, message) => {
      if (message.content == null || message.author == null) return;

      const author = message.author.username;
      const content = message.content.toLowerCase();

      const history = await db.blocklist.History.Get(author);

      var count: number = 0;

      if (author == "Pinky" || author == "Pinky Dev") return;

      if (content.includes("#addword")) return;
      if (content.includes("#deleteword")) return;

      if (MessageFilter.filter.isProfane(content)) {
        history.forEach((user) => {
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
          message: content,
        });

        if (message.deletable) {
          message.delete();
        }
      }
    });

    cli.on("message", async (message) => {
      if (message.content == null || message.author == null) return;

      const author = message.author.username;
      const content = await Tranlator.en.Translate(
        message.content.toLowerCase()
      );

      const history = await db.blocklist.History.Get(author);

      var count: number = 0;

      if (author == "Pinky" || author == "Pinky Dev") return;

      if (content.includes("#addword")) return;
      if (content.includes("#deleteword")) return;

      if (MessageFilter.filter.isProfane(content)) {
        history.forEach(() => count++);

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

        await db.blocklist.History.Add(content, author);

        if (message.deletable) {
          message.delete();
        }
      }
    });
  }

  private async Init() {
    const list = await db.blocklist.Get();

    list.forEach((l) => MessageFilter.filter.addWords(l.word));
  }
}
