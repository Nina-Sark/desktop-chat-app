import styled from "styled-components";

interface ColoredProps {
    color : string;
}

export const ChatRightSideContainer = styled.div`
   background-color: ${props => props.theme.colors.primary};
   padding : 40px 32px;
   height : 100vh;
   overflow-y: auto;

   ::-webkit-scrollbar {
       display: none;
   }

   > #head {
       display: flex;
      flex-direction: column;
      align-items: center;
      gap : 20px;
      border-bottom: 2px solid ${props => props.theme.colors.bg};
      padding-bottom: 20px;

      small {
          font-size : 16px;
          margin-bottom: 10px;
          display: block;
      }

      #content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap : 10px;
      }

      > div {
          color : #fff;
          text-align: center;
          font-family: sans-serif;

          > p {
              font-size: 25px;
              margin-bottom: 5px;
          }
      }
}
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap : 10px;
  place-content: center;
`

export const ColoredDiv = styled.div<ColoredProps>`
   width : 95px;
   height : 80px;
   border-radius: 1.5rem;
   background-color: ${props => props.color};
   cursor: pointer;
`

export const Paragraph = styled.p`
   margin : 20px;
   text-align: center;
   font-size : 16px;
   font-family: sans-serif;
   color : #fff;
`