import moment from "moment";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../db/firebase";
import { ChatThemeI, MessageI } from "../../db/types";
import { updateChatTheme } from "../../db/utils";
import { getSelectedChatTheme } from "../../state/reducers/ChatReducer";
import { STATE } from "../../state/store";
import { Avatar } from "../Avatar/Avatar";
import { IChat } from "../ChatScreen/Chat.types";
import { handleOpenImageModal } from "../Message/Message";
import { Image } from "../Message/Message.styles";
import {
  ChatRightSideContainer,
  ColoredDiv,
  Grid,
  Paragraph,
} from "./ChatRightSide.styles";
import { Option } from "./Option";

interface ChatRightProps extends Pick<IChat, "participant" | "messages"> {
  theme: ChatThemeI | null;
}

export const ChatRightSide: FC<ChatRightProps> = ({
  participant,
  messages,
  theme,
}) => {
  const [user] = useAuthState(auth);

  const router = useRouter();
  const { id: chatId } = router.query;

  const dispatch = useDispatch();

  const themeColors = useSelector((state: STATE) => state.chat.chatTheme);
  const themeSelected = useSelector(
    (state: STATE) => state.chat.selectedChatTheme
  );

  const isSelectedTheme = (bg: string): boolean => {
    return bg === themeSelected?.chat?.bg;
  };

  const imagesData: MessageI[] = messages?.filter(
    ({ type }) => type === "image"
  );

  const handleSelectTheme = async (selectedTheme: ChatThemeI) => {
    if (selectedTheme?.chat?.bg === themeSelected?.chat?.bg) {
      dispatch(getSelectedChatTheme(null));
      await updateChatTheme(null, chatId as string, user?.email as string);
    } else {
      dispatch(getSelectedChatTheme(selectedTheme));
      await updateChatTheme(
        selectedTheme,
        chatId as string,
        user?.email as string
      );
    }
  };

  const grids = imagesData.map(({ messageContent }) => {
    if (messageContent) {
      return (
        <Image
          onClick={() =>
            handleOpenImageModal(
              messageContent?.image as string,
              "img.png",
              dispatch
            )
          }
          width={100}
          height={100}
          src={messageContent?.image}
        />
      );
    }
  });

  const imagesGrids = grids.filter((grid) => Boolean(grid));

  return (
    <ChatRightSideContainer>
      <div id="head">
        <Avatar src={participant?.photo} size={200} active={false} />
        <div id="content">
          <p>{participant?.username}</p>
          <div>
            <small>
              Account created at{" "}
              {moment(user?.metadata?.creationTime).format("LL")}
            </small>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "30px" }}>
        <Option title="Shared Photos">
          {imagesGrids.length === 0 ? (
            <Paragraph>No Shared Photos Yet!</Paragraph>
          ) : (
            <Grid id="content">{imagesGrids}</Grid>
          )}
        </Option>
        <Option title="Pick Chat Theme">
          <Grid style={{ marginTop: "15px" }}>
            {themeColors?.map(({ chat: { bg } }, index) => (
              <ColoredDiv
                style={{
                  border: isSelectedTheme(bg) ? "2px solid #000000" : "none",
                }}
                onClick={() => handleSelectTheme(themeColors[index])}
                color={bg}
              />
            ))}
          </Grid>
        </Option>
      </div>
    </ChatRightSideContainer>
  );
};
