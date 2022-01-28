import styled from "styled-components";

export const Search = styled.div`
  width : 100%;
  display: grid;
  grid-template-columns: 1fr 90%;
  align-items: center;
  padding : 10px 8px;
  background-color: ${props => props.theme.colors.bg};
  border-radius: 0.5rem;

  & > input {
      background: transparent;
      font-size : 16px;
      color : #fff;
      height : 100%;
      border : none; 
      outline: none;

      &::placeholder {
          color : silver;
      }
  }

  & > #icon {
      font-size : 25px;
      color : #fff;
  }
`