import styled from "styled-components";
import { ThemeType } from "./Theme";

export const HomePageStyled = styled.div`
  height : 100vh;
  width : 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap : 20px;
  background : ${props => props.theme.colors.bg};

  & > img {
      width : 400px;
      filter: drop-shadow(0 0 10px ${props => props.theme.colors.primary});

      @media screen and (max-width : 600px) {
          width : 80%;
      }
  }

  & > button {
      background-color: ${props => props.theme.colors.secondary};
      width : 300px;
      padding : 14px 8px;
      border : none;
      border-bottom : 4px solid ${props => props.theme.colors.primary};
      box-shadow: 3px 2px 4px ${props => props.theme.colors.primary};
      cursor: pointer;
      border-radius: 0.8rem;
      font-size: 18px;
      letter-spacing: 0.01em;
      color : ${props => props.theme.colors.primary};
      font-weight : 800;
      transition: background-color 0.2s ease-in-out;

      &:hover {
          background-color: ${props => props.theme.colors.hoverSecondary};
      }

      @media screen and (max-width : 600px) {
          width : 70%;
          padding : 0.7em 0;
          font-size: 1em;
      }
  }
`