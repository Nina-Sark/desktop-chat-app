import { ChatThemeI } from "../../db/types";

export interface MessageProps {
  id?: string;
  sentBy: {
    username: string;
    avatarSrc: string;
  };
  sentTime: string;
  type: "text" | "image";
  messageContent: {
    image?: string;
    text?: string;
  } | null;
  isReply: boolean;
  replyContent?: {
    id: string;
    type: "text" | "image";
    image?: string;
    text?: string;
  } | null;
  theme? : ChatThemeI | null;
  seen? : boolean;
}

export interface ContainerProps {
  byCurrentUser: boolean;
  isReply: boolean;
  chatTheme : ChatThemeI | null;
}

export interface ToolProps {
  hide: boolean;
  byCurrentUser: boolean;
}

export interface ImageProps {
  width: number;
  height: number;
}
