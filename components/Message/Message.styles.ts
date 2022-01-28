import styled, { css } from "styled-components";
import { ChatThemeI } from "../../db/types";
import { ContainerProps, ImageProps, ToolProps } from "./Message.types";

export const MessageContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: max-content;
  margin-left: ${(props) => (props.byCurrentUser ? "auto" : "0%")};
  gap: 5px;
  align-items: ${(props) => (props.byCurrentUser ? "flex-end" : "flex-start")};
  margin-bottom: 20px;
  border-right: ${(props) =>
    props.isReply && !props.byCurrentUser
      ? props.chatTheme
        ? `3px solid ${props.chatTheme.chat.fontColor}`
        : `3px solid black`
      : "none"};
  border-left: ${(props) =>
    props.isReply && props.byCurrentUser
      ? props.chatTheme
        ? `3px solid ${props.chatTheme.chat.fontColor}`
        : `3px solid black`
      : "none"};

  ${(props) =>
    props.isReply &&
    !props.byCurrentUser &&
    css`
      padding-right: 15px;
    `}

  ${(props) =>
    props.isReply &&
    props.byCurrentUser &&
    css`
      padding-left: 15px;
    `}

  #reply_small {
    font-family: sans-serif;
    font-size: 16px;
    display: flex;
    gap: 5px;
    margin-bottom: 10px;
    align-items: center;
    color: ${(props) =>
      !props.chatTheme ? "#000" : props.chatTheme.chat.fontColor};
  }

  & #message {
    max-width: 400px;
    width: max-content;
    padding: 14px 16px;
    color: #fff;
    font-size: 16px;
    border-radius: 1.5rem;
    font-family: sans-serif;
    cursor: pointer;

    background: ${(props) =>
      !props.chatTheme
        ? props.byCurrentUser
          ? props.theme.colors.secondary
          : props.theme.colors.primary
        : props.byCurrentUser
        ? props.chatTheme.currentUserChat.bg
        : props.chatTheme.receiverChat.bg};

    color: ${(props) =>
      !props.chatTheme
        ? props.byCurrentUser
          ? "#000"
          : "#fff"
        : props.byCurrentUser
        ? props.chatTheme.currentUserChat.fontColor
        : props.chatTheme.receiverChat.fontColor};

    ${(props) =>
      props.byCurrentUser
        ? css`
            border-bottom-right-radius: 0%;
          `
        : css`
            border-bottom-left-radius: 0%;
          `}

    > p {
      white-space: normal;
    }
  }
`;

export const MessageContent = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-start;
`;

export const ToolContainer = styled.div<ToolProps>`
  opacity: ${(props) => (props.hide ? 0 : 1)};
  pointer-events: ${(props) => (props.hide ? "none" : "all")};
  display: flex;
  align-items: center;
  margin-left: 55px;
  justify-content: space-between;
  width: ${(props) => (props.byCurrentUser ? "100%" : "calc(100% - 60px)")};

  > small {
    font-family: sans-serif;
    color: #fff;
    font-size: 13px;
  }
`;

export const Image = styled.img<ImageProps>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  object-fit: cover;
  border-radius: 1.5rem;
  cursor: pointer;
`;

export const ReplyMessageText = styled.div<{ chatTheme: ChatThemeI | null }>`
  max-width: 400px;
  width: max-content;
  background-color: ${(props) =>
    !props.chatTheme ? "silver" : props.chatTheme.replyChat.bg};
  color: ${(props) =>
    !props.chatTheme ? "#000" : props.chatTheme.replyChat.fontColor};
  padding: 14px 16px;
  margin-bottom: 10px;
  border-radius: 1.5rem;
  border: 1px solid gray;
  font-family: sans-serif;
  font-size: 16px;
`;

export const RemovedMessageContainer = styled.div<{
  isReply: boolean;
  chatTheme: ChatThemeI | null;
}>`
  text-align: center;
  padding: 18px 20px;
  border-radius: 1.5rem;
  font-family: sans-serif;
  font-size: 17px;
  border: 2px solid black;
  background-color: ${(props) =>
    !props.chatTheme ? "silver" : props.chatTheme.replyChat.bg};
  color: ${(props) =>
    !props.chatTheme ? "#000" : props.chatTheme.replyChat.fontColor};

  ${(props) =>
    props.isReply &&
    css`
      margin-bottom: 10px;
    `}
`;
