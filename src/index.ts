import { EmbedBuilder, Partials } from "discord.js";
import Octa from "octajs";
import listeners from "./events";

import { config } from "dotenv";
import { CHANNELS, COLORS } from "./Constants";
config();

new Octa(
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
)
  .events((builder) => {
    listeners.forEach((listener) => builder.register(listener as any));
    return builder;
  })
  .command({
    name: "신고",
    description: "어라, 규칙을 어긴분이 계신가요?",
    options: {
      user: {
        type: "User",
        description: "규칙을 어긴 유저",
        required: true,
      },
      reason: {
        type: "String",
        description: "사유를 알려주세요",
        required: true,
      },
      file: {
        type: "Attachment",
        description: "증거/참고 자료",
        required: true,
      },
    },
    async executes(client, interaction) {
      try {
        let data = interaction.options.get("file", true);
        let user = interaction.options.getUser("user", true);

        if (!user) return;
        let guild = interaction.guild;
        if (!guild) return;

        let guildUser = await guild.members.fetch(user.id);
        if (!guildUser) return;

        let reportChannel = guild.channels.cache.find(
          (ch) => ch.id == CHANNELS.REPORT
        );
        if (!reportChannel) return;
        if (!reportChannel.isTextBased()) return;

        let attachment = data.attachment;
        if (!attachment) return;
        // console.log(attachment.contentType);
        await guildUser.timeout(60 * 10);
        let baseEmbed = new EmbedBuilder()
          .setTitle("신고")
          .setColor(COLORS.PRIMARY);
        let fields = [
          {
            name: "신고자",
            value: `<@${interaction.user.id}>`,
          },
          {
            name: "신고 대상",
            value: `<@${user.id}>`,
          },
        ];
        let isImage =
          attachment.contentType && attachment.contentType.includes("image");
        let isValidImage = false;
        console.log(attachment.contentType);
        ["png", "jpeg", "bmp"].forEach((ext) => {
          if (
            attachment &&
            attachment.contentType &&
            attachment.contentType.includes(ext)
          )
            isValidImage = true;
        });
        if (isImage && isValidImage) baseEmbed.setImage(attachment.url);
        else
          fields.push({
            name: "첨부",
            value: attachment.url,
          });
        await reportChannel.send({
          embeds: [baseEmbed.addFields(fields)],
        });

        await interaction.reply({
          content:
            "신고가 접수되었어요. 빠른 시일 내에 관리자분들이 처리해주실 거에요.",
          ephemeral: true,
        });
      } catch (e) {
        if (!interaction.replied)
          await interaction.reply({
            content: "신고를 접수하던중 에러가 발생했어요.",
            ephemeral: true,
          });
      }
    },
  })
  // Start the bot
  .start();
