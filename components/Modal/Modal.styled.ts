import styled from "styled-components";
import { ModalProps } from "./Modal.types";

export const ModalContainer = styled.div<ModalProps>`
   width : 100vw;
   height :100vh;
   padding : 40px 0;
   position: absolute;
   top : 0;
   left : 0;
   background-color: rgba(0, 0, 0, 0.5);
   backdrop-filter: blur(6px);
   display: ${props => props.open ? 'flex' : 'none'};
   z-index : 10;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap : 1em;
`

export const ModalContentContainer = styled.div`
  background: rgba(165, 218, 251, 0.1);
  height : 80px;
  box-shadow: 0 0 8px #fff;
  border-radius: 2rem;
  width : 600px;
  backdrop-filter: blur(2px);
  display: grid;
  grid-template-columns: 1fr 150px;
  padding : 0 0 0 1em;
  align-items: center;
  grid-template-rows: 80px;
  place-content: center;
  column-gap: 0.8em;

  & > input, button {
      height : 100%;
  }

  & > input {
      background: transparent !important;
      border : none;
      outline : none;
      font-size : 1.3em;
      color : #fff;
  }

  & > button {
      border-top-right-radius: 2rem;
      border-bottom-right-radius: 2rem;
      border : none;
      outline: none;
      font-size : 1.3em;
      cursor: pointer;
  }

`

export const Span = styled.span`
  font-size : 1.1em;
  font-family: sans-serif;
  color : #fff;
  display: block;
  background-color: red;
  width : 600px;
  text-align: center;
  padding : 0.4em;
`