import { EventListener } from "octajs";
import {
  ONE_DAY_THREAD_CHANNELS,
  THREE_DAY_THREAD_CHANNELS,
} from "../Constants";
import { ThreadAutoArchiveDuration } from "discord.js";
import threadNameCreater from "../utils/ThreadNameCreater";
import nameFromMessage from "../utils/NameFromMessage";

const ThreadCreater: EventListener<"messageCreate"> = {
  type: "messageCreate",
  async listener(bot, message) {
    try {
      if (message.author.bot) return;
      if (message.author.id == bot.user?.id) return;
      if (
        !ONE_DAY_THREAD_CHANNELS.includes(message.channelId) &&
        !THREE_DAY_THREAD_CHANNELS.includes(message.channelId)
      )
        return;
      if (message.hasThread) return;
      let threadName = threadNameCreater({
        channelID: message.channelId,
        content: message.content,
        username: nameFromMessage(message as any),
      });

      let t = ThreadAutoArchiveDuration.OneDay;
      if (THREE_DAY_THREAD_CHANNELS.includes(message.channelId))
        t = ThreadAutoArchiveDuration.ThreeDays;
      await message.startThread({
        name: threadName,
        autoArchiveDuration: t,
      });
    } catch (e) {
      console.error(e);
    }
  },
};

export default ThreadCreater;
