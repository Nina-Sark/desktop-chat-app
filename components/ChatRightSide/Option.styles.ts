import styled from "styled-components";

interface Props {
    expanded : boolean;
}

export const OptionContainer = styled.div<Props>`
   width : 100%;
   border-radius: 0.6rem;
   margin-bottom: 10px;
   height : ${props => props.expanded ? "max-content" : "40px"};
   overflow-y: hidden;

   > #content {
       background : transparent;
       padding : 20px 10px;
       font-family: sans-serif;
   }
`

export const OptionTitle = styled.div<Props>`
   width : 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   font-size : 22px;
   font-family: sans-serif;
   cursor: pointer;
   padding : 8px 10px;
   color : #fff;
   transition: 0.2s;
   background-color: ${props => props.expanded ? props.theme.colors.bg : "transparent"};
   color : ${props => props.expanded ? "#000": "#fff"};

   :hover {
       background-color: ${props => props.theme.colors.bg};
       color: #000;
   }
`