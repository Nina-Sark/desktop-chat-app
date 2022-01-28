import styled from "styled-components";

export const ReplyContainer = styled.div`
  position: sticky;
  left: 0;
  width: 100%;
  background: ${(props) => props.theme.colors.bgHover};
  height: 50px;
  padding: 8px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap : 20px;

  & > div {
    display: grid;
    grid-template-columns: 25px 80px 1fr;
    align-items: center;

    > p {
      font-size: 16px;
      font-family: sans-serif;
    }

    > p:nth-child(2) {
      color: silver;
    }

    > p:nth-child(3) {
      color: #fff;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
