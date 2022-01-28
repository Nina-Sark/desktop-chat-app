import { ChatThemeI, MessageI, USER } from "../../db/types";

export interface IChat {
  theme : ChatThemeI | null;
  participant : USER,
  messages : MessageI[]
}

export interface Styles {
    bg : string;
}