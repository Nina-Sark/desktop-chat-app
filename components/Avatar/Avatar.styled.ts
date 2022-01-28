import styled from "styled-components";
import { IAvatarStylesProps } from "./Avatar.types";

export const AvatarContainer = styled.img<IAvatarStylesProps>`
  width : ${props => `${props.size}px`};
  height : ${props => `${props.size}px`};
  border-radius: 50%;
  cursor: pointer;
`

export const Container = styled.div`
  position: relative;
  display: grid;
  place-items: center;
`

export const Circle = styled.div`
   width : 12px;
   height : 12px;
   background-color: rgb(7, 252, 40);
   border-radius: 50%;
   position: absolute;
   bottom : -2px;
   right : 9px;
   border : 1px solid #555;
`