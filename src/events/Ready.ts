import { EventListener } from "octajs";

const OnReady: EventListener<"ready"> = {
  type: "ready",
  listener(bot, client) {
    try {
      console.log(`Signed in as ${client.user.tag}`);
      client.user.setActivity({
        name: `OctaJS (${require("octajs/package.json").version}) by poi ❤️`,
        type: 1,
      });
    } catch (e) {
      console.error(e);
    }
  },
};
export default OnReady;
