import { HexColorString } from "discord.js";

const IS_DEV = false;

const GUILD_ID = IS_DEV ? "1133670934046318732" : "990982149299666964";
const ROLES = {
  USER: IS_DEV ? "1133672481077592154" : "990985638826369084",
};
const CHANNELS = {
  ADMIN_DM: IS_DEV ? "1133674724912799775" : "1136178087852244993",
  PLAYIMAGE: "995540799850819595",
  PALYVIDEO: "1136252002112917514",
  SEARCH_TEAM: "995262506853486592",
};
const COLORS: { [key in "PRIMARY"]: HexColorString } = {
  PRIMARY: "#ff7eb3",
};

const FOOTER_TEXT = "Made by Team.poi with ❤️";
const SERVER_URL = "https://discord.gg/CZqekxVrtH";
const ASK_RESPONSE_PREFIX = `안녕하세요. [PlayIO 플레이아이오](${SERVER_URL})입니다.\n\n`;

const THREE_DAY_THREAD_CHANNELS: string[] = [
  CHANNELS.PLAYIMAGE,
  CHANNELS.PALYVIDEO,
];
const ONE_DAY_THREAD_CHANNELS: string[] = [CHANNELS.SEARCH_TEAM];

export {
  IS_DEV,
  GUILD_ID,
  ROLES,
  CHANNELS,
  COLORS,
  FOOTER_TEXT,
  SERVER_URL,
  ASK_RESPONSE_PREFIX,
  THREE_DAY_THREAD_CHANNELS,
  ONE_DAY_THREAD_CHANNELS,
};
