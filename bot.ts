import discord from "discord.js";
import { MessageFilter } from "./commands/MessageFilter/Filter";

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

new MessageFilter(cli);

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
