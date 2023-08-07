import { EventListener } from "octajs";
import { CHANNELS, COLORS, FOOTER_TEXT, GUILD_ID } from "../Constants";
import { TextChannel, EmbedBuilder } from "discord.js";
import nameFromMessage from "../utils/NameFromMessage";

const DMRedirecter: EventListener<"messageCreate"> = {
  type: "messageCreate",
  async listener(bot, message) {
    try {
      if (!message.content) return;
      if (message.guild) return;
      const guild = bot.guilds.cache.find((guild) => guild.id == GUILD_ID);
      if (!guild) return;
      const channel_ = guild.channels.cache.find(
        (channel) => channel.id == CHANNELS.ADMIN_DM
      );
      if (!channel_) return;
      const channel = channel_ as unknown as TextChannel;
      if (!channel || !channel.send) return;

      await channel.send({
        content: "",
        embeds: [
          new EmbedBuilder()
            .setTitle("문의")
            .setColor(COLORS.PRIMARY)
            .setFooter({
              text: `From. ${nameFromMessage(message as any)}`,
            })
            .setTimestamp(new Date())
            .addFields([
              {
                name: "문의 내용",
                value: message.content,
              },
              {
                name: "User ID",
                value: message.author.id,
              },
            ]),
        ],
      });
    } catch (e) {
      console.error(e);
    }
  },
};
export default DMRedirecter;
