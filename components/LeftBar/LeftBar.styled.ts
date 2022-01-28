import styled from "styled-components";
import { MdMoreHoriz } from "react-icons/md";

interface ButtonProps {
  bg : string;
  hoverBg : string;
  size : number;
}

export const AvatarHeader = styled.header`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

  display : flex;
  align-items: center;
  justify-content: space-between;
  width : 100%;

  & > div {
      display: flex;
      gap : 1em;
      align-items: center;

      & > h1 {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size : 25px;
    color : #fff;
    width : 150px;
  }
  }
`

export const Header = styled.header`
  padding : 3em 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap : 30px;
  position: sticky;
  z-index : 1;
  top : 0;
  background-color: ${props => props.theme.colors.primary};
`

export const Bar = styled.div`
  height : 100vh;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.primary};
  border-right : 2px solid ${props => props.theme.colors.primary};

  &::-webkit-scrollbar {
    width : 8px;
  }

  &::-webkit-scrollbar-track {
      background: ${props => props.theme.colors.primary};
  }

  &::-webkit-scrollbar-thumb {
      border-radius: 1rem;
      background-color: ${props => props.theme.colors.secondary};
  }

`

export const Icon = styled(MdMoreHoriz)`
   font-size : 25px;
   color : #fff;
`

export const IconButton = styled.div<ButtonProps>`
  width : ${props => `${props.size}px`};
  height : ${props => `${props.size}px`};
  border-radius: 50%;
  cursor: pointer;
  background-color: ${props => props.bg};
  display: grid;
  place-content: center;
  flex-shrink: 0;
  transition: background-color 0.3s ease-in-out;

  &:hover {
      background-color: ${props => props.hoverBg};
  }
`