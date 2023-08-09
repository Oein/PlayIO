import { Partials } from "discord.js";
import Octa from "octajs";
import listeners from "./events";
import commands from "./commands";

import { config } from "dotenv";
config();

let octabot = new Octa(
  {
    token: process.env.TOKEN!,
  },
  {
    intents: [
      "DirectMessages",
      "Guilds",
      "MessageContent",
      "GuildMembers",
      "GuildMessages",
      "GuildMessageTyping",
      "GuildMessageReactions",
      "GuildBans",
      "GuildEmojisAndStickers",
      "GuildIntegrations",
      "GuildInvites",
      "GuildPresences",
      "GuildModeration",
    ],
    partials: [
      Partials.Channel,
      Partials.Message,
      Partials.GuildMember,
      Partials.GuildScheduledEvent,
      Partials.Reaction,
      Partials.ThreadMember,
      Partials.User,
    ],
  }
);
// Register event listeners
octabot.events((builder) => {
  listeners.forEach((listener) => builder.register(listener as any));
  return builder;
});

// Register commands
commands.forEach((command) => octabot.command(command));

// Start the bot
octabot.start();
