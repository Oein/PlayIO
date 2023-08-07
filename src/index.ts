import { Partials } from "discord.js";
import Octa from "octajs";
import listeners from "./events";

new Octa(
  {
    token:
      "MTEzMzYyOTgzNzU2Nzg3MzA1Ng.GweO9f.roMieNuE1sFGHkgSXxaD2jkqanI5iLIK5t7hKI",
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
)
  .events((builder) => {
    listeners.forEach((listener) => builder.register(listener as any));
    return builder;
  })
  // Start the bot
  .start();
