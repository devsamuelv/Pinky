import discord from "discord.js";
import { Command } from "./commands/Command";

require("dotenv").config();

const token = process.env.TOKEN!;

const cli = new discord.Client({
  presence: {
    activity: {
      type: "LISTENING",
      name: "Chat",
    },
  },
});

cli.setMaxListeners(100);

new Command(cli);

if (token == null)
  throw new Error("There is no available token in your enviroment");

cli
  .login(token)
  .then(() => {
    console.log(`Pinky is Running`);
  })
  .catch((err) => {
    throw new Error(err.message);
  });
