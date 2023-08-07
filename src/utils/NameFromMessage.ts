import { Message } from "discord.js";

export default function nameFromMessage(message: Message) {
  return (
    message.member?.nickname ||
    message.member?.displayName ||
    message.author.username ||
    message.author.tag
  );
}
