import { async, querystringDecode } from "@firebase/util";
import { current } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { cloneElement } from "react";
import { MessageProps } from "../components/Message/Message.types";
import { auth, db } from "./firebase";
import { ChatThemeI, MessageI, USER } from "./types";

const google = new GoogleAuthProvider();

export const handleLogin = () => {
  return signInWithPopup(auth, google);
};

export const addUserToDB = (email: string, username: string, photo: string) => {
  setDoc(doc(db, "users", email), {
    email,
    username,
    photo,
    lastActive: null,
  });
};

export const updateUserDB = (email: string) => {
  return updateDoc(doc(db, "users", email), {
    lastActive: serverTimestamp(),
  });
};

export const signOutHandler = () => {
  return signOut(auth);
};

export const getDateHandler = (date: string): string => {
  console.log(date);
  return new Date(((date as unknown) as number) * 1000).toJSON();
};

export const getDataHandler = async <T, USER>(id: string): Promise<T[]> => {
  let data: T[] = [];
  let messages: any[] = [];
  let usersDataArr: USER[] = [];

  const q = query(
    collection(db, "users", id, "chats"),
    orderBy("lastActive", "desc")
  );
  const chats = await getDocs(q);

  const trasnformedData = await transformDataHandler<T>(chats, data, id);

  const modifiedData = await modifyDataHandler<T, USER>(trasnformedData, id);

  return modifiedData;
};

export const transformDataHandler = async <T>(
  chats: QuerySnapshot<DocumentData> | any[],
  data: T[],
  id: string | null
): Promise<T[]> => {
  let arrayOfData: T[] = [...data];

  chats.forEach((doc) => {
    arrayOfData = [
      ...arrayOfData,
      {
        id: doc.id,
        participant: doc
          .data()
          .participants.filter((p: string) => p !== id)?.[0],
        lastActive: getDateHandler(
          doc?.data()?.lastActive?.toMillis()?.toString()
        ),
        message: [],
        notSeenMessages: [],
      },
    ];
  });

  return arrayOfData;
};

export const modifyDataHandler = async <DataType, USER>(
  data: DataType[],
  id: string | null
): Promise<DataType[]> => {
  let dataARRAY = [...data];

  let messages: any[] = [];
  let notSeenMessagesArr: any[] = [];
  let usersDataArr: USER[] = [];

  const users = [...dataARRAY].map((d) => d.participant);

  for (let i = 0; i < users.length; i++) {
    const docSnapUser = await getDoc(doc(db, "users", users[i]));
    const userData = {
      ...docSnapUser.data(),
      lastActive: getDateHandler(
        docSnapUser?.data()?.lastActive?.toMillis()?.toString()
      ),
    };

    usersDataArr = [...usersDataArr, userData];
  }

  dataARRAY = [...dataARRAY]?.map((d, i) => {
    if (d?.participant === usersDataArr[i]?.email) {
      return { ...d, participant: usersDataArr[i] };
    } else {
      return { ...d };
    }
  });

  for (let j = 0; j < dataARRAY.length; j++) {
    if (dataARRAY[j]) {
      const mQ = query(
        collection(db, "users", id, "chats", dataARRAY[j]?.id, "messages"),
        orderBy("sentTime", "asc")
      );
      const docSnapMessages = await getDocs(mQ);
      if (!docSnapMessages.empty) {
        docSnapMessages.forEach((doc) => {
          messages = [
            ...messages,
            {
              id: doc.id,
              ...doc.data(),
              sentTime: getDateHandler(
                doc?.data()?.sentTime?.toMillis()?.toString()
              ),
            },
          ];
        });
      }
    }
  }

  dataARRAY = [...dataARRAY].map((d) => {
    let filteredMessages = [...messages].filter((m) => m?.chatId === d?.id);
    let allNotSeenMessagesArr = [...filteredMessages].filter(
      (m) => m?.sentBy?.username !== id && !m?.seen
    );

    if (
      d?.id === filteredMessages?.[0]?.chatId &&
      filteredMessages?.length > 0
    ) {
      return {
        ...d,
        notSeenMessages: allNotSeenMessagesArr,
      };
    }
    return { ...d };
  });

  dataARRAY = [...dataARRAY].map((d) => {
    let messagesARR = [...messages].filter((m) => m?.chatId === d?.id);
    let messageDATA = messagesARR[messagesARR.length - 1];
    if (d?.id === messageDATA?.chatId && messagesARR.length > 0) {
      return {
        ...d,
        message: Boolean(messageDATA?.messageContent)
          ? messageDATA?.type == "text"
            ? messageDATA?.messageContent?.text
            : "Image sent"
          : "Message removed",
      };
    }

    if (messagesARR.length == 0) {
      return { ...d, message: "" };
    }
  });

  return dataARRAY;
};

export const doesUserExist = async (
  email: string,
  user: any
): Promise<boolean> => {
  const userDoc = await getDoc(doc(db, "users", email));
  return userDoc.exists() && email !== user?.email;
};

export const doesAlredyHaveChat = async (
  user: any,
  email: string
): Promise<boolean> => {
  const q = query(
    collection(db, "users", user?.email, "chats"),
    where("participants", "array-contains", email)
  );
  const data = await getDocs(q);
  return !data?.empty && email !== user?.email;
};

export const userHasChatInitiated = async (
  email: string,
  user: any
): Promise<boolean> => {
  const q = query(
    collection(db, "users", email, "chats"),
    where("participants", "array-contains", user?.email)
  );
  const data = await getDocs(q);
  return !data.empty;
};

export const handleCreateChat = async (
  email: string,
  participants: [string, string],
  user?: any
): Promise<string | void> => {
  const newChatRef = doc(collection(db, "users", email, "chats"));
  await setDoc(newChatRef, {
    lastActive: serverTimestamp(),
    participants,
    theme: null,
  });
  if (email === user?.email) return newChatRef?.id as string;
};

export const getChatParticipants = async (
  id: string,
  user: string
): Promise<USER | null> => {
  const q = doc(db, "users", user, "chats", id);
  const chatDoc = await getDoc(q);
  if (chatDoc?.exists()) {
    const participantEmail: string = chatDoc
      ?.data()!
      ?.participants.filter((participant: string) => participant !== user)[0];

    const qParticipant = doc(db, "users", participantEmail);
    const participantDoc = await getDoc(qParticipant);
    const isActiveNow: boolean = participantDoc?.data().lastActive === null;
    return {
      ...participantDoc.data(),
      lastActive:
        isActiveNow == false
          ? JSON.stringify(participantDoc?.data()?.lastActive)
          : null,
    };
  }
  return null;
};

export const getChatTheme = async (
  id: string,
  user: string
): Promise<ChatThemeI | null> => {
  const q = doc(db, "users", user, "chats", id);
  const chatDoc = await getDoc(q);

  if (chatDoc.exists()) {
    return chatDoc.data()?.theme;
  }
  return null;
};

export const getMessagesForChat = async (
  id: string,
  user: string
): Promise<MessageI[]> => {
  let messagesDocs: MessageI[] = [];
  const q = query(
    collection(db, "users", user, "chats", id, "messages"),
    orderBy("sentTime", "asc")
  );
  const messages = await getDocs(q);

  if (!messages?.empty) {
    messagesDocs = messages.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      sentTime: JSON.stringify(doc?.data()?.sentTime),
    }));
    await handleUnseenMessages(messagesDocs, id, user);
    return messagesDocs;
  }
  return [];
};

export const updateChatActivity = async (
  userEmail: string,
  chatId: string
): Promise<void> => {
  const chatDoc = doc(db, "users", userEmail, "chats", chatId);
  await updateDoc(chatDoc, {
    lastActive: serverTimestamp(),
  });
};

const getReceiverChatId = async (
  receiverEmail: string,
  currentUserEmail: string
): Promise<string> => {
  const q = query(
    collection(db, "users", receiverEmail, "chats"),
    where("participants", "array-contains", currentUserEmail)
  );
  const receiverChat = await getDocs(q);
  const receiverChatId = receiverChat.docs.map((doc) => doc?.id)[0];

  return receiverChatId;
};

export const createNewMessage = async (
  message: any,
  receiverHasChat: boolean,
  receiverEmail: string,
  currentUserEmail: string,
  chatId: string
): Promise<void> => {
  const messageRef = doc(
    collection(db, "users", currentUserEmail, "chats", chatId, "messages")
  );
  await setDoc(messageRef, { ...message, chatId });
  const messageId: string = messageRef?.id;
  await updateChatActivity(currentUserEmail, chatId);

  if (receiverHasChat) {
    const receiverChatId = await getReceiverChatId(
      receiverEmail,
      currentUserEmail
    );

    await createReceiverNewMessage(
      receiverEmail,
      receiverChatId,
      messageId,
      message
    );
  } else {
    const chatDoc = doc(collection(db, "users", receiverEmail, "chats"));
    await setDoc(chatDoc, {
      lastActive: serverTimestamp(),
      participants: [receiverEmail, currentUserEmail],
      theme : null
    });
    const newChatId: string = chatDoc?.id;
    await createReceiverNewMessage(
      receiverEmail,
      newChatId,
      messageId,
      message
    );
  }
};

const createReceiverNewMessage = async (
  receiverEmail: string,
  receiverChatId: string,
  messageId: string,
  message: any
): Promise<void> => {
  const receiverMessageRef = doc(
    db,
    "users",
    receiverEmail,
    "chats",
    receiverChatId,
    "messages",
    messageId
  );
  await setDoc(receiverMessageRef, { ...message, chatId: receiverChatId });
  await updateChatActivity(receiverEmail, receiverChatId);
};

export const handleDeleteChat = async (currentUser: string, chatId: string) => {
  const docChat = doc(db, "users", currentUser, "chats", chatId);
  await deleteDoc(docChat);
};

export const updateChatTheme = async (
  selectedTheme: ChatThemeI | null,
  chatId: string,
  userEmail: string
): Promise<void> => {
  const chatDoc = doc(db, "users", userEmail, "chats", chatId);
  await updateDoc(chatDoc, {
    theme: selectedTheme,
  });
};

export const handleRemoveMessage = async (
  userEmail: string,
  receiverEmail: string,
  chatId: string,
  messageId: string
) => {
  // CURRENT USER CHAT

  const messageDocRef = doc(
    db,
    "users",
    userEmail,
    "chats",
    chatId,
    "messages",
    messageId
  );
  await updateDoc(messageDocRef, {
    messageContent: null,
    isReply: false,
    replyContent: null,
  });
  console.log("MESSAGE", messageDocRef.id);

  const qCurrentUserChat = query(
    collection(db, "users", userEmail, "chats", chatId, "messages"),
    where("replyContent.id", "==", messageId)
  );
  const currentUserMessageReplies = await getDocs(qCurrentUserChat);
  if (!currentUserMessageReplies.empty) {
    currentUserMessageReplies.docs.map(async (messageDocReply) => {
      await updateDoc(
        doc(
          db,
          "users",
          userEmail,
          "chats",
          chatId,
          "messages",
          messageDocReply.id
        ),
        {
          replyContent: null,
        }
      );
    });
  }

  // RECEIVER CHAT

  const receiverChatId = await getReceiverChatId(receiverEmail, userEmail);
  const receiverMessageDocRef = doc(
    db,
    "users",
    receiverEmail,
    "chats",
    receiverChatId,
    "messages",
    messageId
  );
  const receiverMessageDoc = await getDoc(receiverMessageDocRef);

  if (receiverMessageDoc.exists()) {
    await updateDoc(receiverMessageDocRef, {
      messageContent: null,
      isReply: false,
      replyContent: null,
    });
    console.log("RECEIVER MESSAGE", receiverMessageDoc.id);
  }

  const qReceiverChat = query(
    collection(db, "users", receiverEmail, "chats", receiverChatId, "messages"),
    where("replyContent.id", "==", receiverMessageDoc.id)
  );
  const receiverMessageReplies = await getDocs(qReceiverChat);
  if (!receiverMessageReplies.empty) {
    receiverMessageReplies.docs.map(async (receiverMessageDoc) => {
      await updateDoc(
        doc(
          db,
          "users",
          receiverEmail,
          "chats",
          receiverChatId,
          "messages",
          receiverMessageDoc.id
        ),
        {
          replyContent: null,
        }
      );
    });
  }
};


export const handleUnseenMessages = async (messages: MessageI[], chatId: string, userEmail: string): Promise<void> => {
   const notSeenMessages = [...messages].filter((message: MessageI) => message?.sentBy?.username !== userEmail && !message?.seen);

   if(notSeenMessages?.length !== 0) {
    notSeenMessages.forEach(async (notSeenMessage) => {
      const notSeenMessageDoc = doc(db, "users", userEmail, "chats", chatId, "messages", notSeenMessage?.id);
      await updateDoc(notSeenMessageDoc, {
        seen : true
      })
    })
   }
}