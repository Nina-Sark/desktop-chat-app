import styled from "styled-components";

export const LoaderContainer = styled.div`
  height : 100vh;
  width : 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background : ${props => props.theme.colors.bg};
`