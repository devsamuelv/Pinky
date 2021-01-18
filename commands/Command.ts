import discord from "discord.js";
import { AddWord } from "./MessageFilter/AddWord";
import { Blocklist } from "./MessageFilter/Blocklist";
import { DeleteWord } from "./MessageFilter/DeleteWord";
import { MessageFilter } from "./MessageFilter/Filter";
import { GetHistory } from "./MessageFilter/GetHistory";
import { MessageHelp } from "./MessageFilter/Help";

export class Command {
  constructor(cli: discord.Client) {
    new AddWord(cli);
    new DeleteWord(cli);
    new GetHistory(cli);
    new Blocklist(cli);
    new MessageFilter(cli);
    new MessageHelp(cli);
  }
}
