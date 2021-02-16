import discord, { Message } from "discord.js";
import Filter from "bad-words";
import { db } from "../../db/db";
import { Tranlator } from "../../Translator/Translator";

export class MessageFilter {
  public static filter = new Filter({
    regex: /\*|\.|$/gi,
    replaceRegex: /[A-Za-z0-9가-힣_]/g,
  });
  private curseCount: IHistoryEntry[] = [];

  private StopCussingVideo = "https://www.youtube.com/watch?v=D7JmlWbnMgc";

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
      const tr = await Tranlator.en.Translate(message.content.toLowerCase());
      const content = tr.toLowerCase();

      const history = await db.blocklist.History.Get(author);

      var count: number = 0;

      if (author == "Pinky" || author == "Pinky Dev") return;

      if (content.includes("#addword")) return;
      if (content.includes("#deleteword")) return;

      if (MessageFilter.filter.isProfane(content)) {
        history.forEach(() => count++);

        if (count > 20) {
          const dm = await message.author.createDM();

          dm.send(this.StopCussingVideo);
        } else if (count > 10) {
          const dm = await message.author.createDM();

          dm.send(
            `you know im going to delete your messages anyway :rolling_eyes:`
          );
        } else if (count > 5) {
          const dm = await message.author.createDM();

          dm.send(`HOW MANY TIMES DO I HAVE TO TELL YOU STOP CURSING!!!!!`);
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

  private async ProtectNick(content: string, message: Message) {
    if (
      (content.includes("<@!584580976928096257>") && content.includes("job")) ||
      content.includes("nice") ||
      content.includes("good") ||
      content.includes("amazing") ||
      content.includes("great") ||
      content.includes("your") ||
      content.includes("doing")
    ) {
      if (message.deletable) {
        message.delete();

        const channel = await message.author.createDM();

        return channel.send("DON'T INTERRUPT NICK HE IS WORKING :rage: ");
      }
    }
  }

  private async Init() {
    const list = await db.blocklist.Get();

    MessageFilter.filter.removeWords("crap");
    MessageFilter.filter.removeWords("god");

    list.forEach((l) => MessageFilter.filter.addWords(l.word));
  }
}
