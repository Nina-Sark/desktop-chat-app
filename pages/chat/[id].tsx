import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import Cookies from "js-cookie";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { ChatRightSide } from "../../components/ChatRightSide/ChatRightSide";
import { ChatScreen } from "../../components/ChatScreen/ChatScreen";
import { HeadComponent } from "../../components/Head/Head";
import { ImageModal } from "../../components/ImageModal/ImageModal";
import { LeftBar } from "../../components/LeftBar/LeftBar";
import { Loader } from "../../components/Loader/Loader";
import { Image } from "../../components/Message/Message.styles";
import { ModalContainer } from "../../components/Modal/Modal.styled";
import { auth, db } from "../../db/firebase";
import { ChatThemeI, MessageI, USER } from "../../db/types";
import { getChatParticipants, getChatTheme, getMessagesForChat, handleUnseenMessages } from "../../db/utils";
import { getData, getSelectedChatTheme } from "../../state/reducers/ChatReducer";
import { toggleImageModal } from "../../state/reducers/ModalReducer";
import { STATE } from "../../state/store";
import { ChatPageContainer, LinkComponent } from "../../styles/ChatPage.styles";

interface ChatPageProps {
  id: string;
  chatParticipant: USER;
  messages: MessageI[];
  title: string;
  description: string;
  theme : ChatThemeI | null;
}

const ChatPage: NextPage<ChatPageProps> = ({
  id,
  chatParticipant,
  messages,
  title,
  description,
  theme,
}) => {
  const dispatch = useDispatch();

  const [user, loading] = useAuthState(auth);
  const themeSelected = useSelector((state: STATE) => state.chat.selectedChatTheme);

  const [participant, setParticipant] = useState<USER>(chatParticipant);
  const [chatMessages, setChatMessages] = useState<MessageI[]>(messages);
  const [chatTheme, setChatTheme] = useState<ChatThemeI | null>(theme)

  useEffect(() => {
    dispatch(getData({ participant, messages }));
    if (user?.email) {
      dispatch(getSelectedChatTheme(chatTheme));
      const q = query(
        collection(db, "users", user?.email as string, "chats", id, "messages"),
        orderBy("sentTime", "asc")
      );
      const unsub = onSnapshot(q, async (snapshot) => {
        const messagesData: MessageI[] = snapshot?.docs?.map((message) => ({
          ...message?.data(),
          id: message?.id,
          sentTime: JSON.stringify(message?.data()?.sentTime),
        }));
        setChatMessages(messagesData);
        await handleUnseenMessages(messagesData, id, user?.email as string);
        dispatch(getData({ participant, messages : messagesData }));
      });

      return unsub;
    }
  }, [user]);


  useEffect(() => {
     if(user?.email) {
      const q = doc(db, "users", user?.email, "chats", id);
      const unsub = onSnapshot(q, doc => {
           setChatTheme(doc?.data()?.theme)
      })
      return unsub;
     }
  }, [themeSelected])

  if (loading) {
    return (
      <>
        <HeadComponent title={`Account`} description="Account" />
        <Loader loading={loading} />
      </>
    );
  }

  if (!loading && user) {
    return (
      <ChatPageContainer>
        <ImageModal />
        <HeadComponent title={title} description={description} />
        <ChatScreen
          theme={chatTheme}
          participant={participant}
          messages={chatMessages}
        />
        <ChatRightSide theme={chatTheme} participant={participant} messages={chatMessages} />
      </ChatPageContainer>
    );
  }

  return (
    <>
      <HeadComponent title={`Account`} description="Account" />
      <Loader loading={true} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const {
    cookies: { currentUser },
  } = req;

  if (!currentUser) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const id: string = (ctx.params as { id: string }).id;
    const chatParticipant: USER = await getChatParticipants(id, currentUser);
    const chatTheme = await getChatTheme(id, currentUser);
    console.log(chatTheme)
    const messages: MessageI[] = await getMessagesForChat(id, currentUser);

    if(chatParticipant === null) {
      return {
        redirect: {
          destination: `/404`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        id,
        chatParticipant,
        messages,
        title: "Private Chat",
        description: "Chat, Private Chat",
        theme : chatTheme
      },
    };
  }
};

export default ChatPage;
