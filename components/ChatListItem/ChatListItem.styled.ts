import styled from "styled-components";
import { StyleProps } from "./ChatItem.types";

export const Item = styled.div<StyleProps>`
  padding : 1em 1.5em;
  background: ${props => props.theme.colors.bg};
  cursor: pointer;
  transition: background 0.2s ease-in;
  display: grid;
  grid-template-columns: ${props => props.width} 1fr 1fr;
  justify-content: center;
  align-items: center;
  gap : 15px;
  border-bottom: 3px solid ${props => props.theme.colors.primary};

  :hover {
    background: ${props => props.theme.colors.bgHover};
  }

  & h4, p {
      font-family: sans-serif;
  }

  & h4 {
    font-size: 18px;
    margin-bottom: 5px;
    color : #fff;
  }

  & p {
      color : rgb(226, 224, 226);
      font-size : 15px;
      white-space: nowrap; 
      width : 215px;
  overflow: hidden;
  text-overflow: ellipsis; 
  }

`
export const NotificationContainer = styled.div`
   width : 20px;
   height : 20px;
   background-color: #18C8DF;
   font-size : 12px;
   color : #fff;
   font-family: sans-serif;
   border-radius: 50%;
   border : 1px solid #555;
   display: grid;
   place-items: center;
`