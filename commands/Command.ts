import discord from "discord.js";
import { AddWord } from "./MessageFilter/AddWord";
import { MessageFilter } from "./MessageFilter/Filter";
import { MessageHelp } from "./MessageFilter/Help";

export class Command {
  constructor(cli: discord.Client) {
    new AddWord(cli);
    new MessageFilter(cli);
    new MessageHelp(cli);
  }
}
