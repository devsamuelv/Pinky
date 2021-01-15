import discord from "discord.js";
import { AddWord } from "./MessageFilter/AddWord";

export class Command {
  constructor(cli: discord.Client) {
    new AddWord(cli);
  }
}
