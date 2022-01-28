import { ReactNode } from "react";
import { ChatThemeI, MessageI, USER } from "../../db/types";

interface MessageReply {
    id : string;
    type : "text" | "image";
    image? : string;
    text? : string;
}


export interface InitialStateI {
    participant : USER | {};
    messages : MessageI[],
    messageRef : ReactNode | null,
    showDownBtn : boolean,
    messageToReplyTo : MessageReply | null;
    file : any;
    chatTheme : ChatThemeI[];
    selectedChatTheme : ChatThemeI | null;
}

export type GET_DATA_ACTION = { type : string, payload : InitialStateI } 
export type GET_MESSAGE_REF_ACTION = { type : string, payload : ReactNode }
export type GET_SHOW_BTN_ACTION = { type : string, payload : boolean }
export type GET_MESSAGE_TO_REPLY_TO_ACTION = { type : string, payload : MessageReply | null }
export type GET_FILE_ACTION = { type : string, payload : any }
export type GET_SELECTED_CHAT_THEME = { type : string, payload : ChatThemeI | null }