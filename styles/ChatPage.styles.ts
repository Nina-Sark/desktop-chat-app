import styled from "styled-components";

export const ChatPageContainer = styled.div`
   display: grid;
   grid-template-columns: 1fr 400px;
   position: relative;
`

export const LinkComponent = styled.a`
   font-family: sans-serif;
   color : #000;
   text-decoration: none;
   background-color: ${props => props.theme.colors.secondary};
   padding : 10px 20px;
   border-radius: 5rem;
   margin-top : 10px;

   :hover {
      background-color: ${props => props.theme.colors.hoverSecondary};
   }
`