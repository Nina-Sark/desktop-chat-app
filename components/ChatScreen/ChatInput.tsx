import React, { FC, useEffect, useState } from "react";
import { ButtonUp, ChatInputContainer, InputContainer } from "./Chat.styles";
import {
  MdOutlineImage,
  MdEmojiEmotions,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { theme } from "../../styles/Theme";
import { LoaderIndicator } from "../LoaderIndicator/LoaderIndicator";
import { useDispatch, useSelector } from "react-redux";
import { STATE } from "../../state/store";
import { createNewMessage, userHasChatInitiated } from "../../db/utils";
import { USER } from "../../db/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../../db/firebase";
import { useRouter } from "next/router";
import { MessageProps } from "../Message/Message.types";
import { serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getFile, getMessageToReplyTo } from "../../state/reducers/ChatReducer";
import { IChat } from "./Chat.types";

export const ChatInput: FC<Pick<IChat, "theme">> = ({ theme: chatTheme }) => {
  console.log("CHAT THEME ===",chatTheme)
  const [user] = useAuthState(auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const { id: chatId } = router?.query;

  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<any>(null);
  const [progressValue, setProgressValues] = useState<number>(0);
  const [imageURL, setImageURL] = useState<string>("");

  const participant = useSelector(
    (state: STATE) => state.chat.participant
  ) as USER;
  const showValue = useSelector((state: STATE) => state.chat.showDownBtn);
  const messageElm = useSelector(
    (state: STATE) => state.chat.messageRef
  ) as HTMLDivElement;
  const replyOpen = useSelector((state: STATE) => state.chat.messageToReplyTo)!;

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const handleNewMessage = async (
    messageData: any,
    type: string
  ): Promise<void> => {
    if (input.length === 0 && type === "text") return;
    setDisabled(true);
    const userHasChat = await userHasChatInitiated(
      participant?.email as string,
      user
    );

    let newMessageData = messageData;

    if (Boolean(replyOpen)) {
      newMessageData = {
        ...messageData,
        isReply: true,
        replyContent: {
          id: replyOpen?.id,
          type: replyOpen?.type,
          [replyOpen?.type as string]: replyOpen[replyOpen?.type],
        },
        seen : false
      };
    }

    await createNewMessage(
      newMessageData,
      userHasChat,
      participant?.email as string,
      user?.email as string,
      chatId as string
    );
    setInput("");
    setDisabled(false);
    if (Boolean(replyOpen)) dispatch(getMessageToReplyTo(null));
  };

  const handleUp = () => {
    messageElm.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleUpload = (fileName: string, file: any) => {
    const storageRef = ref(storage, `/images/${chatId}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        setProgressValues(Math.round(progress));
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          setImageURL(url);
          await handleNewMessage(
            {
              sentBy: {
                username: user?.email as string,
                avatarSrc: user?.photoURL as string,
              },
              sentTime: serverTimestamp(),
              type: "image",
              messageContent: {
                image: url,
              },
              isReply: false,
              seen : false
            },
            "image"
          );
          console.log(url);
          setImageFile(null);
          dispatch(getFile(null));
          if (Boolean(replyOpen)) dispatch(getMessageToReplyTo(null));
          setProgressValues(0);
        });
      }
    );
  };

  useEffect(() => {
    if (!imageFile) return;
    dispatch(getFile(imageFile));
    handleUpload(imageFile.name as string, imageFile);
  }, [imageFile]);

  return (
    <ChatInputContainer>
      {imageFile && (
        <LoaderIndicator
          progress={progressValue}
          fileName={imageFile?.name as string}
        />
      )}
      <ButtonUp
        bg={!chatTheme ? "default" : chatTheme?.upButton?.bg}
        fontColor={!chatTheme ? "default" : chatTheme?.upButton?.fontColor}
        show={showValue}
        style={{ position: "absolute", bottom: 200 }}
        onClick={handleUp}
      >
        <MdKeyboardArrowDown />
      </ButtonUp>

      <InputContainer style={{ position: "relative" }}>
        <div>
          <label for="img_file">
            <MdOutlineImage id="icon" />
          </label>
          <input
            onChange={handleFile}
            disabled={disabled}
            accept="image/png, image/jpeg"
            type="file"
            id="img_file"
            hidden
          />
          {open && (
            <Picker
              onSelect={addEmoji}
              color={theme.colors.primary}
              style={{
                maxWidth: "300px",
                backgroundColor: theme.colors.secondary,
                position: "absolute",
                bottom: 100,
              }}
            />
          )}
          <MdEmojiEmotions id="icon" onClick={() => setOpen(!open)} />
        </div>
        <textarea
          disabled={disabled}
          maxLength={700}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter something..."
        />
        <button
          disabled={disabled}
          onClick={() =>
            handleNewMessage(
              {
                sentBy: {
                  username: user?.email as string,
                  avatarSrc: user?.photoURL as string,
                },
                sentTime: serverTimestamp(),
                type: "text",
                messageContent: {
                  text: input,
                },
                isReply: false,
                seen : false
              },
              "text"
            )
          }
        >
          Send
        </button>
      </InputContainer>
    </ChatInputContainer>
  );
};
