import { CHANNELS } from "../Constants";

export default function threadNameCreater(props: {
  channelID?: string;
  content?: string;
  username?: string;
}) {
  switch (props.channelID) {
    case CHANNELS.PALYVIDEO:
      return `${props.username}님의 플레이 영상`;
    case CHANNELS.PLAYIMAGE:
      return `${props.username}님의 플레이 사진`;
    default:
      break;
  }

  let threadName = props.content;
  if (threadName) {
    if (threadName.length > 40) threadName = threadName.slice(0, 37) + "...";
    return threadName;
  }

  return `${props.username}님의 Threads`;
}
