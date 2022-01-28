import styled, { css } from "styled-components";
import { Styles } from "./Chat.types";

export const RightSide = styled.div`
  place-self: center flex-end;
  width: max-content;
`;

export const ChatHeaderComponent = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  align-items: center;
  background-color: rgba(132, 55, 197, 0.9);
  backdrop-filter: blur(5px);
  padding: 1em 2em;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 5;
`;

export const Item = styled.div`
  background: transparent;
  cursor: pointer;
  display: grid;
  grid-template-columns: 60px 1fr;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;

  & h4,
  p {
    font-family: sans-serif;
  }

  & h4 {
    font-size: 18px;
    margin-bottom: 5px;
    color: #fff;
  }

  & p {
    color: rgb(226, 224, 226);
    font-size: 14px;
  }
`;

export const ChatContainerComponent = styled.div<Styles>`
  background-color: ${(props) => props.bg === "default" ? props.theme.colors.bg : props.bg};
  height: 100vh;
`;

export const MessagesContainer = styled.div<{ empty : boolean }>`
  padding: 3em 2em 0em 2em;
  background-color: transparent;
  overflow-y: auto;

  ${props => props.empty && css`
     display: flex;
     align-items: center;
     justify-content: center;
  `}

  > p {
    color : #fff;
    font-size : 20px;
    font-family: sans-serif;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ChatInputContainer = styled.div`
  background-color: rgb(165, 218, 251, 0.8);
  height: max-content;
  min-height: 100px;
  position: fixed;
  bottom: 0;
  width: calc(100% - 400px);
  left: 0;
  z-index: 5;
  backdrop-filter: blur(3px);
  display: grid;
  place-items: center;

  & > #c {
    background-color: red;
    height: 100%;
    width: 100%;
    height: 50px;
  }
`;

export const InputContainer = styled.div`
  width: 60%;
  background-color: ${(props) => props.theme.colors.primary};
  display: grid;
  grid-template-columns: 70px 1fr 100px;
  align-items: center;
  padding: 10px 16px;
  border-radius: 1rem;
  margin: 0 auto;

  > * {
    height: 100%;
  }

  & > div > #icon {
    font-size: 26px;
    color: #fff;
    place-self: center;
    cursor: pointer;
  }

  & > div > label {
    color: #fff;
    display: grid;
    font-size: 26px;
    place-items: center;
    width: max-content;
    height: max-content;
    cursor: pointer;
  }

  & > textarea {
    margin: 0 10px;
    background-color: transparent;
    border: none;
    outline: none;
    resize: none;
    color: #fff;
    font-size: 16px;

    ::-webkit-scrollbar {
      display: none;
    }

    ::placeholder {
      color: silver;
    }
  }

  & > button {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border: none;
    background-color: ${(props) => props.theme.colors.bg};
    cursor: pointer;
    padding: 15px;
    font-size: 16px;
    color: #fff;

    &:hover {
      background-color: ${(props) => props.theme.colors.bgHover};
    }
  }

  & > div {
    display: grid;
    grid-template-columns: repeat(2, 35px);
    align-items: center;
  }
`;

export const ConfirmationContainer = styled.div`
  width: 500px;
  padding: 35px 35px 20px 35px;
  border-radius: 1.2rem;
  background-color: ${(props) => props.theme.colors.hoverSecondary};
  box-shadow: 0 0 8px ${(props) => props.theme.colors.hoverSecondary};
`;

export const ConfirmationTitle = styled.div`
  display: flex;
  gap: 10px;
  font-size: 20px;
  font-family: sans-serif;
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid black;
`;

export const BTN = styled.button<{ color : string; }>`
   padding : 10px 20px;
   background-color: ${props => props.color};
   border : none;
   font-size : 15px;
   border-radius: 4rem;
   display: flex;
   align-items: center;
   cursor: pointer;
   transition: all ease 0.2s;

   :hover {
     background-color: ${props => props.theme.colors.bgHover};
   }
`

export const ButtonUp = styled.div<{ show : boolean, bg : string, fontColor : string }>`
  border-radius: 50%;
  width : 40px;
  height : 40px;
  cursor: pointer;
  font-size : 25px;
  display: ${props => props.show ? "grid" : "none"};
  place-content: center;
  background-color: ${props => props.bg === "default" ? props.theme.colors.primary : props.bg};
  color : ${props => props.fontColor === "default" ? props.theme.colors.secondary : props.fontColor};
  border: none;
  box-shadow: 3px 3px 3px silver;
  transition: all ease 0.2s;
  
  :hover {
    transform: scale(1.05);
  }
`
