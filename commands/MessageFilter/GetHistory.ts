import discord, {
  Collector,
  Emoji,
  Message,
  MessageReaction,
  ReactionCollector,
  ReactionEmoji,
  User,
} from "discord.js";
import { db } from "../../db/db";

export class GetHistory {
  private adminRoleId = "723228470720856167";
  private command = "#gethistory";

  constructor(cli: discord.Client) {
    cli.on("message", async (message) => {
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
        const history = await this.GetHistory(username);

        if (history.length > 2000) {
          const chunks = this.SplitAtLimit(history, 1000);

          const prompt_content = `are you sure ${username} is ${chunks.length} pages long`;

          const coninue = await this.Prompt(
            message.author.id,
            message,
            prompt_content
          );

          if (!coninue) return;

          for (var i = 0; i != chunks.length; i++) {
            const chunk = chunks[i];

            message.channel.send(
              author + " History ```json\n" + chunk + "\n``` "
            );
          }

          return message.channel.send("**===== END OF CHUNKED LIST =====**");
        }

        return message.reply(
          author + " History ```json\n" + history + "\n``` "
        );
      }
    });
  }

  private Prompt = (authorId: string, message: Message, content: string) =>
    new Promise<boolean>(async (resolve) => {
      const msg = await message.channel.send(content);
      const reactions: string[] = ["👍", "👎"];

      const filter_yes = (reaction: MessageReaction, user: User) =>
        reaction.emoji.name === reactions[0] && user.id == authorId;

      const filter_no = (reaction: MessageReaction, user: User) =>
        reaction.emoji.name === reactions[1] && user.id == authorId;

      msg.react("👍");
      msg.react("👎");

      const yes = msg.createReactionCollector(filter_yes);

      const no = msg.createReactionCollector(filter_no);

      yes.on("collect", () => {
        return resolve(true);
      });

      no.on("collect", () => {
        return resolve(false);
      });
    });

  private SplitAtLimit(full: string, limit: number): string[] {
    const _splits = Math.round(full.length / limit);
    const _chunks: string[] = [];
    var _pre_split = 0;

    for (var i = 0; i != _splits; i++) {
      const _next = limit;
      const _split = full.substr(_pre_split, _next);

      _pre_split = _next;
      _chunks.push(_split);
    }

    return _chunks;
  }

  private async GetHistory(username: string) {
    const history = await db.blocklist.History.Get(username);

    return JSON.stringify(history);
  }
}
