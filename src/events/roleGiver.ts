import { EventListener } from "octajs";
import { ROLES } from "../Constants";

const RoleGiver: EventListener<"guildMemberAdd"> = {
  type: "guildMemberAdd",
  async listener(bot, member) {
    try {
      if (member.user.bot) return;
      const role = member.guild.roles.cache.find(
        (role) => role.id == ROLES.USER
      );
      if (!role) return;
      member.roles.add(role).catch((e) => {
        console.error(e);
      });
    } catch (e) {}
  },
};
export default RoleGiver;
