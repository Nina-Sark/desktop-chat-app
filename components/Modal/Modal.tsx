import { useRouter } from "next/router";
import React, { FC, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../db/firebase";
import {
  doesAlredyHaveChat,
  doesUserExist,
  handleCreateChat,
  userHasChatInitiated,
} from "../../db/utils";
import { toggleModal } from "../../state/reducers/ModalReducer";
import { ModalContainer, ModalContentContainer, Span } from "./Modal.styled";
import { ELEMENT, ModalProps } from "./Modal.types";

export const Modal: FC<ModalProps> = ({ open }) => {
  const [user] = useAuthState(auth);
  const inp = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const dispatch = useDispatch();

  const handleNewChat = async () => {
    const inputValue = (inp.current as HTMLInputElement).value;
    if (inputValue.length > 0) {
      const isUser = await doesUserExist(
        inputValue ? inputValue : "random",
        user
      );
      const alreadyHasChat = await doesAlredyHaveChat(user, inputValue);
     // const userHasChat = await userHasChatInitiated(inputValue, user);

      if (inputValue === user?.email) {
        setError("You can't start a chat with yourself!");
      } else if (!isUser) {
        setError("User doesn't exist!");
      } else if (alreadyHasChat) {
        setError(`You already have a chat with ${inputValue}`);
      } else {
        const participants: [string, string] = [
          inputValue,
          user?.email as string,
        ];
       // if (!userHasChat) {
        //  await handleCreateChat(inputValue, participants);
       // }
         const id = await handleCreateChat(user?.email as string, participants, user);
         router.push(`/chat/${id}`);
        setError("");
        dispatch(toggleModal());
      }
    }
  };

  const handleClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const el = e.target as unknown as HTMLDivElement;
    if (el.id === "content") return;
    dispatch(toggleModal());
    const inpElement = inp.current as HTMLInputElement;
    inpElement.value = "";
    setError("");
  };

  return (
    <ModalContainer onClick={handleClose} open={open}>
      <ModalContentContainer id="content">
        <input
          ref={inp}
          id="content"
          placeholder="Enter a valid user email..."
        />
        <button onClick={handleNewChat} id="content">
          Create
        </button>
      </ModalContentContainer>
      {error && <Span id="content">{error}</Span>}
    </ModalContainer>
  );
};
