import React, { FC } from 'react';
import { Avatar } from '../Avatar/Avatar';
import { ChatListItem } from '../ChatListItem/ChatListItem';
import { IconButton } from '../LeftBar/LeftBar.styled';
import { BTN, ChatHeaderComponent, ConfirmationContainer, ConfirmationTitle, Item, RightSide } from './Chat.styles';
import { MdMoreVert, MdWarning, MdDeleteForever } from "react-icons/md";
import { theme } from '../../styles/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { toggleImageModal } from '../../state/reducers/ModalReducer';
import { STATE } from '../../state/store';
import { USER } from '../../db/types';
import moment from "moment";
import { IChat } from './Chat.types';
import { handleDeleteChat } from '../../db/utils';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../db/firebase';
import { useRouter } from 'next/router';

const ConfirmationComponent = () => {

  const [user] = useAuthState(auth);
  const router = useRouter();
  const { id: chatId } = router.query;

  const dispatch = useDispatch()

  const handleClose = () => {
     dispatch(toggleImageModal({
       open : false,
       children : null
     }))
  }

  const deleteChat = async () => {
    await handleDeleteChat(user?.email as string, chatId as string);
    router.push(`/account/${user?.email}`);
    handleClose()
  }

  return (
    <ConfirmationContainer id="content">
     <ConfirmationTitle id="content">
       <MdWarning id="content"/>
       <p id="content">Are you sure you want to delete the chat? </p>
     </ConfirmationTitle>
     <div style={{ display : "flex", gap : "20px" }} id="content">
       <BTN onClick={handleClose} color="transparent" id="content">Cancel</BTN>
       <BTN color={theme.colors.bg} id="content" onClick={deleteChat}>Delete <MdDeleteForever style={{ fontSize : "20px" }} id="content"/></BTN>
     </div>
    </ConfirmationContainer>
  )
}

export const ChatHeader: FC<Pick<IChat, "participant">> = ({ participant }) => {

  const dispatch = useDispatch()

  const t = JSON.parse(participant?.lastActive as string)
  const date = new Date(t?.seconds * 1000)

  const formattedLastActive = moment(date);

  const handleOpen = (): void => {
     dispatch(toggleImageModal({
       open : true,
       children : <ConfirmationComponent/>
     }))
  }

  return <ChatHeaderComponent>
      <Item>    
            <Avatar 
            active={participant?.lastActive == null}
            src={participant?.photo}
            size={60}/>
          <div>
              <h4>{participant?.username}</h4>
              <p>{participant?.lastActive === null ? "active now" : `Last active: ${moment(date, "YYYYMMDD").fromNow()}`}</p> 
          </div>
        </Item>
       <RightSide>
          <IconButton size={40} bg={theme.colors.bg} hoverBg={theme.colors.bgHover}>
              <MdMoreVert onClick={handleOpen} style={{ fontSize : "25px", color : "#fff" }}/>
          </IconButton>
       </RightSide>
  </ChatHeaderComponent>;
};
