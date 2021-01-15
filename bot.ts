import discord from "discord.js";
import { Command } from "./commands/Command";
import { Json } from "./util/Json";

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

if (!Json.Exists(".config.json")) {
  Json.Write(
    ".config.json",
    JSON.stringify({
      words: [],
      users: [],
    })
  );
}

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
