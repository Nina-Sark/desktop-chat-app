import styled from "styled-components";

export const Container = styled.div`
   height : 100vh;
   background: ${props => props.theme.colors.bg};
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap : 30px;

   & > button {
       width : 100px;
       height : 100px;
       border-radius: 50%;
       display: grid;
       place-content: center;
       border : none;
       font-size: 40px;
       background-color: ${props => props.theme.colors.secondary};
       box-shadow: 6px 6px 6px ${props => props.theme.colors.primary};
       color : ${props => props.theme.colors.primary};
       cursor: pointer;

       &:hover {
          background-color: ${props => props.theme.colors.hoverSecondary};
      }

      @media screen and (max-width : 1150px) {
              width : 80px;
              height : 80px;
              font-size : 40px;
          }

   }

   & > h2 {
          font-family: sans-serif;
          color : ${props => props.theme.colors.secondary};
          text-shadow : 0 0 6px black;
          font-size : 40px;

          @media screen and (max-width : 1150px) {
              font-size: 25px;
              width : 100%;
              text-align: center;
              padding : 0 20px;
          }
      }
`