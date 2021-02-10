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

      const channelId = message.channel.id;
      const ignoredChannels = await db.ignore.Get();

      for (var i = 0; i != ignoredChannels.length; i++) {
        const id = ignoredChannels[i].channelId;

        if (channelId == id) return;
      }

      const author = message.author;
      const username = author.username;
      const tag = author.tag;
      const watchedUsers = await db.watch.Get();
      var content = message.content;

      for (var i = 0; i != watchedUsers.length; i++) {
        const user = watchedUsers[i];
        const userAndTag = `${tag}`;

        if (user.UsernameAndTag == userAndTag) {
          content = await Tranlator.en.Translate(content);
        }
      }

      const history = await db.blocklist.History.Get(username);

      var count: number = 0;

      if (username == "Pinky" || username == "Pinky Dev") return;

      if (content.includes("#addword")) return;
      if (content.includes("#deleteword")) return;

      if (MessageFilter.filter.isProfane(content)) {
        history.forEach((user) => {
          if (user.username == username) {
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
          username: username,
          message: content,
        });

        if (message.deletable) {
          message.delete();
        }
      }
    });

    cli.on("message", async (message) => {
      if (message.content == null || message.author == null) return;

      const channelId = message.channel.id;
      const ignoredChannels = await db.ignore.Get();

      for (var i = 0; i != ignoredChannels.length; i++) {
        const id = ignoredChannels[i].channelId;

        if (channelId == id) return;
      }

      const author = message.author;
      const username = author.username;
      const tag = author.tag;
      const watchedUsers = await db.watch.Get();
      var content = message.content;

      for (var i = 0; i != watchedUsers.length; i++) {
        const user = watchedUsers[i];
        const userAndTag = `${tag}`;

        console.log(userAndTag, watchedUsers);

        if (user.UsernameAndTag == userAndTag) {
          content = await Tranlator.en.Translate(content);
        }
      }

      const history = await db.blocklist.History.Get(username);

      var count: number = 0;

      if (username == "Pinky" || username == "Pinky Dev") return;

      if (content.includes("#addword")) return;
      if (content.includes("#deleteword")) return;

      if (MessageFilter.filter.isProfane(content)) {
        history.forEach((user) => {
          if (user.username == username) {
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
          username: username,
          message: content,
        });

        if (message.deletable) {
          message.delete();
        }
      }
    });
  }

  private async Init() {
    const list = await db.blocklist.Get();

    MessageFilter.filter.removeWords("crap");

    list.forEach((l) => MessageFilter.filter.addWords(l.word));
  }
}
