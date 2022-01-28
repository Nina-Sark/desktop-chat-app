export interface USER {
  email: string;
  username: string;
  photo: string;
  lastActive: string | null;
}

export interface DATA {
  id: string;
  participant: [string] | USER | undefined;
  lastActive: string | undefined;
  message: string;
}

export interface MessageI {
  id: string;
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
  chatId: string;
  seen? : boolean;
}

export interface ThemeI {
  bg: string;
  fontColor: string;
}

export interface UpButtonI extends ThemeI {
  hover: {
    receiver: string;
    currentUser: string;
  };
}

export interface ChatThemeI {
  chat: ThemeI;
  currentUserChat: ThemeI;
  receiverChat: ThemeI;
  replyChat: ThemeI;
  upButton: UpButtonI;
}
