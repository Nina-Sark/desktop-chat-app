import React, { FC, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../db/firebase";
import { Avatar } from "../Avatar/Avatar";
import {
  Image,
  MessageContainer,
  MessageContent,
  ReplyMessageText,
  ToolContainer,
} from "./Message.styles";
import { MessageProps } from "./Message.types";
import { MdOutlineReply, MdDeleteForever } from "react-icons/md";
import { IconButton } from "../LeftBar/LeftBar.styled";
import { theme } from "../../styles/Theme";
import { useDispatch, useSelector } from "react-redux";
import { toggleImageModal } from "../../state/reducers/ModalReducer";
import { Dispatch } from "@reduxjs/toolkit";
import { LinkComponent } from "../../styles/ChatPage.styles";
import { STATE } from "../../state/store";
import moment from "moment";
import {
  getMessageRef,
  getMessageToReplyTo,
  getShowDownBtn,
} from "../../state/reducers/ChatReducer";
import { ChatThemeI, Theme, USER } from "../../db/types";
import { RemovedMessage } from "./RemovedMessage";
import { stat } from "fs";
import { handleRemoveMessage } from "../../db/utils";
import { useRouter } from "next/router";

export const handleOpenImageModal = (
  src: string,
  imageName: string,
  dispatch: Dispatch<any>
): void => {
  dispatch(
    toggleImageModal({
      open: true,
      src,
      imageName,
      children: (
        <>
          <Image
            id="content"
            width={500}
            height={600}
            style={{
              boxShadow: "0 0 8px #fff",
              objectFit: "contain",
              width: "max-content",
              height: "90%",
            }}
            src={src}
          />
          <LinkComponent download={imageName} href={src} id="content">
            Download Image
          </LinkComponent>
        </>
      ),
    })
  );
};

export const Message: FC<MessageProps> = ({
  id,
  sentBy,
  sentTime,
  type,
  messageContent,
  isReply,
  replyContent,
  theme: chatTheme
}) => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const { id: chatId } = useRouter().query;

  const participant = useSelector((state: STATE) => state.chat.participant);

  const elmMessage = useRef<HTMLDivElement | null>(null);

  const t = JSON.parse(sentTime as string);
  const date = new Date(t?.seconds * 1000);

  const [hidden, setHidden] = useState<boolean>(true);

  useEffect(() => {
    elmMessage.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    dispatch(getMessageRef(elmMessage.current));
    dispatch(getShowDownBtn(false));
  }, []);

  const byCurrentUser = user?.email === sentBy.username;

  const handleSelectMessageToReplyTo = () => {
    dispatch(
      getMessageToReplyTo({
        id: id as string,
        type,
        [type]: messageContent[type],
      })
    );
  };


  const handleDelete = async () => {
     await handleRemoveMessage(user?.email as string, (( participant as unknown ) as USER ).email, chatId as string, id as string);
  }

  return (
    <MessageContainer
      id="m"
      chatTheme={chatTheme as ChatThemeI | null}
      isReply={isReply}
      ref={elmMessage}
      onMouseOver={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
      byCurrentUser={byCurrentUser}
    >
      <MessageContent>
        {!byCurrentUser && (
          <Avatar src={sentBy?.avatarSrc as string} size={50} />
        )}
        <div>
          {isReply && (
            <small id="reply_small">
              <MdOutlineReply style={{ color: !chatTheme ? "#000" : chatTheme?.chat?.fontColor, fontSize: "25px" }} />{" "}
              {byCurrentUser ? "Your reply" : "Replied to"}
            </small>
          )}
          {replyContent ? isReply ? (
            replyContent?.type === "text" ? (
              <>
                <ReplyMessageText chatTheme={chatTheme as ChatThemeI | null}>{replyContent.text}</ReplyMessageText>
              </>
            ) : (
              <Image
                style={{
                  marginBottom: "10px",
                  maxWidth: "400px",
                  width: "max-content",
                  height: "30%",
                  objectFit: "cover",
                }}
                onClick={() =>
                  handleOpenImageModal(
                    replyContent?.image as string,
                    "image",
                    dispatch
                  )
                }
                width={350}
                height={300}
                src={replyContent?.image}
              />
            )
          ) : null : isReply ? <RemovedMessage byCurrentUser={byCurrentUser} isReply={true} chatTheme={chatTheme as ChatThemeI | null}/> : null}
          {messageContent ? type === "text" ? (
            <div id="message">
              <p>{messageContent?.text}</p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent:
                  sentBy === user?.email ? "flex-end" : "flex-start",
                width: "max-content",
              }}
            >
              <Image
                style={{
                  maxWidth: "400px",
                  width: "max-content",
                  height: "30%",
                  objectFit: "cover",
                }}
                onClick={() =>
                  handleOpenImageModal(
                    messageContent.image as string,
                    "image",
                    dispatch
                  )
                }
                width={350}
                height={300}
                src={messageContent.image}
              />
            </div>
          ) : <RemovedMessage byCurrentUser={byCurrentUser} isReply={false} chatTheme={chatTheme as ChatThemeI | null}/>}
        </div>
      </MessageContent>
      <ToolContainer
        style={{ gap: "15px" }}
        byCurrentUser={byCurrentUser}
        hide={hidden}
        id="tools"
      >
        <small style={{ width: "max-content", color : !chatTheme ? "#fff" : chatTheme?.chat?.fontColor }}>
          {moment(date).format("L LT")}
        </small>
        {!byCurrentUser && Boolean(messageContent) && (
          <IconButton
            onClick={handleSelectMessageToReplyTo}
            size={25}
            bg={!chatTheme ? theme.colors.primary : chatTheme.receiverChat.bg}
            hoverBg={!chatTheme ? theme.colors.bgHover : chatTheme.upButton.hover.receiver}
          >
            <MdOutlineReply style={{ color: !chatTheme ? "#fff" : chatTheme?.receiverChat?.fontColor, fontSize: "16px" }} />
          </IconButton>
        )}
        {byCurrentUser && Boolean(messageContent) && (
          <IconButton
          onClick={handleDelete}
          style={{ display : isReply === true || Boolean(replyContent) || Boolean(messageContent) ? "grid" : "none" }}
            size={25}
            bg={!chatTheme ? theme?.colors?.secondary : chatTheme?.currentUserChat?.bg}
            hoverBg={!chatTheme ? theme.colors.hoverSecondary : chatTheme?.upButton?.hover?.currentUser}
          >
            <MdDeleteForever style={{ color: !chatTheme ? "#000" : chatTheme?.currentUserChat?.fontColor, fontSize: "16px" }} />
          </IconButton>
        )}
      </ToolContainer>
    </MessageContainer>
  );
};
