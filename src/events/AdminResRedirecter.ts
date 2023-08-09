import { EventListener } from "octajs";
import { ASK_RESPONSE_PREFIX, CHANNELS, COLORS } from "../Constants";
import { EmbedBuilder, TextChannel } from "discord.js";

const AdminResRedirecter: EventListener<"messageCreate"> = {
  type: "messageCreate",
  async listener(bot, message) {
    try {
      if (message.channelId != CHANNELS.ADMIN_DM) return;
      let reference = message.reference;
      if (!reference) return;
      if (!reference.messageId) return;
      let channel = bot.channels.cache.find(
        (c) => c.id == reference!.channelId
      );
      if (!channel) return;
      if (!message.channel.isTextBased()) return;
      let originalMessage = await (
        message.channel as unknown as TextChannel
      ).messages.fetch(reference.messageId);

      // Check Message
      if (!originalMessage) return;
      if (originalMessage.author.id !== bot.user?.id) return;
      if (originalMessage.embeds.length == 0) return;

      // Get User ID
      let fileds = originalMessage.embeds[0].fields;
      if (fileds.length < 2) return;
      let filtedes = fileds.filter((x) => x.name == "User ID");
      if (filtedes.length == 0) return;
      let filt = filtedes[0];
      let userid = filt.value.replace("<@", "").replace(">", "");

      // Send DM
      (await bot.users.createDM(userid)).send({
        embeds: [
          new EmbedBuilder({
            title: "답변",
            description: ASK_RESPONSE_PREFIX + message.content,
            footer: {
              text: "From. PlayIO",
            },
            timestamp: new Date(),
          }).setColor(COLORS.PRIMARY),
        ],
      });
    } catch (e) {
      console.error(e);
    }
  },
};

export default AdminResRedirecter;
