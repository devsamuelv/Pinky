import discord from "discord.js";
import { CooldownFilter } from "./Cooldown/filter";
import { Freeze } from "./Cooldown/freeze";
import { UnFreeze } from "./Cooldown/thaw";
import { Ignore } from "./Ignore/Ignore";
import { Remember } from "./Ignore/Remember";
import { AddWord } from "./MessageFilter/AddWord";
import { Blocklist } from "./MessageFilter/Blocklist";
import { DeleteWord } from "./MessageFilter/DeleteWord";
import { MessageFilter } from "./MessageFilter/Filter";
import { GetHistory } from "./MessageFilter/GetHistory";
import { MessageHelp } from "./MessageFilter/Help";
import { Watch } from "./Watch/Watch";
import { WipeChannel } from "./Wipe/Wipe";

export class Command {
  constructor(cli: discord.Client) {
    new AddWord(cli);
    new DeleteWord(cli);
    new GetHistory(cli);
    new Freeze(cli);
    new UnFreeze(cli);
    new CooldownFilter(cli);
    new Blocklist(cli);
    new MessageFilter(cli);
    new MessageHelp(cli);
    new WipeChannel(cli);
    new Ignore(cli);
    new Remember(cli);
    new Watch(cli);
  }
}
