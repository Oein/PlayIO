import { EventListener } from "octajs";
import { CHANNELS, COLORS, FOOTER_TEXT, GUILD_ID } from "../Constants";
import { TextChannel, EmbedBuilder } from "discord.js";
import nameFromMessage from "../utils/NameFromMessage";

const DMRedirecter: EventListener<"messageCreate"> = {
  type: "messageCreate",
  async listener(bot, message) {
    try {
      if (message.guild) return;
      const guild = bot.guilds.cache.find((guild) => guild.id == GUILD_ID);
      if (!guild) return;
      const channel_ = guild.channels.cache.find(
        (channel) => channel.id == CHANNELS.ADMIN_DM
      );
      if (!channel_) return;
      const channel = channel_ as unknown as TextChannel;
      if (!channel || !channel.send) return;
      let avURL = message.author.avatarURL({
        size: 512,
      });
      await channel.send({
        content: "",
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: nameFromMessage(message as any),
              ...(avURL ? { iconURL: avURL } : {}),
            })
            .setColor(COLORS.PRIMARY)
            .addFields({
              name: "문의",
              value: message.content,
            })
            .setFooter({
              text: `${message.author.id}`,
            })
            .setTimestamp(new Date()),
        ],
      });
    } catch (e) {
      console.error(e);
    }
  },
};
export default DMRedirecter;
