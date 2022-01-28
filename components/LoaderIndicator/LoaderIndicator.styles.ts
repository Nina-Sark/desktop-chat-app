import styled from "styled-components";

export const LoaderIndicatorContainer = styled.div`
  position: absolute;
  width : 100%;
  bottom: 100px;
  background : ${props => props.theme.colors.secondary};
  height : 20px;
  display: flex;
  align-items: center;
  padding : 0 2em;
  font-size: 12px;
  color : #000;
  font-family: sans-serif;

  & > div {
      position: absolute;
      top : 0;
      left : 0;
      height : 100%;
      background : ${props => props.theme.colors.primary};
      transition: width 0.6s ease-in-out;
  }

  > span {
      z-index : 12;
  }
`