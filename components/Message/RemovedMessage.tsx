import React, { FC } from 'react';
import { ChatThemeI } from '../../db/types';
import { RemovedMessageContainer } from './Message.styles';

interface Props {
    isReply : boolean;
    chatTheme : ChatThemeI | null;
    byCurrentUser : boolean;
}

export const RemovedMessage: FC<Props> = ({ isReply, chatTheme, byCurrentUser }) => {
  return <RemovedMessageContainer isReply={isReply} chatTheme={chatTheme}>
      {byCurrentUser ? "You removed a message" : "Message removed"}
  </RemovedMessageContainer>;
};
