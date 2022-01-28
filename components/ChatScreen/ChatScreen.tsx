import React, { FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowDownBtn } from "../../state/reducers/ChatReducer";
import { STATE } from "../../state/store";
import { LoaderIndicator } from "../LoaderIndicator/LoaderIndicator";
import { Message } from "../Message/Message";
import { Reply } from "../Reply/Reply";
import { ChatContainerComponent, MessagesContainer } from "./Chat.styles";
import { IChat } from "./Chat.types";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";

export const ChatScreen: FC<IChat> = ({ theme, participant, messages }) => {

  const dispatch = useDispatch()

  const messageElm = useSelector((state: STATE) => state.chat.messageRef);
  const messageToReplyTo = useSelector((state: STATE) => state.chat.messageToReplyTo);
  
  const open = Boolean(messageToReplyTo);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const elm = (e.target as HTMLDivElement);
      const boundingRectBottom = elm.getBoundingClientRect().bottom;
      const messageYPosition = (messageElm as HTMLDivElement).getBoundingClientRect().y

      if((messageYPosition - boundingRectBottom) > 400) {
         dispatch(getShowDownBtn(true))
      } else {
        dispatch(getShowDownBtn(false))
      }
  }


  return (
    <ChatContainerComponent bg={!theme ? "default" : theme?.chat?.bg}>
      <ChatHeader participant={participant} />
      <MessagesContainer
        onScroll={handleScroll}
        empty={messages?.length === 0}
        style={{ height: `calc(100vh - ${open ? "242px" : "192px"})` }}
      >
        {messages?.length === 0 && <p style={{ color : !theme ? "#fff" : theme?.chat?.fontColor }}>Text something to initiate a chat</p>}
        {messages.map((message) => (
          <>
          <Message theme={theme} {...message} />
          </>
        ))}
      </MessagesContainer>

      { messageToReplyTo !== null &&  <Reply type={messageToReplyTo?.type} message={messageToReplyTo[messageToReplyTo?.type]}/>  }
      <ChatInput theme={theme}/>
    </ChatContainerComponent>
  );
};
