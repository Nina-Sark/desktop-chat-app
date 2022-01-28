import React, { FC } from "react";
import { ReplyContainer } from "./Reply.styles";
import { ReplyProps } from "./Reply.types";
import { MdReply, MdClose } from "react-icons/md";
import { theme } from "../../styles/Theme";
import { useDispatch, useSelector } from "react-redux";
import { getMessageToReplyTo } from "../../state/reducers/ChatReducer";
import { STATE } from "../../state/store";

export const Reply: FC<ReplyProps> = ({ type, message }) => {
  const dispatch = useDispatch();
  const open = Boolean(useSelector((state: STATE) => state.chat.file));
  return (
    <ReplyContainer style={{ bottom : `${open ? "120px" : "100px"}` }}>
      <div>
        <MdReply style={{ color: "silver", fontSize: "20px" }} />
        <p>Reply to - </p>
        {type === "text" ? <p>{message}</p> : <img src={message} width={35} height={35}/>}
      </div>

      {!open && (
        <MdClose
        onClick={() => dispatch(getMessageToReplyTo(null))}
        style={{
          color: theme.colors.secondary,
          fontSize: "30px",
          cursor: "pointer",
        }}
        />
      )}

    </ReplyContainer>
  );
};
