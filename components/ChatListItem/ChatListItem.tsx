import { FC } from "react"
import { Avatar } from "../Avatar/Avatar"
import { IChatItemProps } from "./ChatItem.types"
import { Item, NotificationContainer } from "./ChatListItem.styled"

export const ChatListItem: FC<IChatItemProps> = ({ id, src, username, message, active, size, onClick, width, notSeen }) => {
  console.log(message)
    return (
          <Item width={width} onClick={onClick}>    
            <Avatar 
            active={active}
            src={src}
            size={size}/>
          <div>
              <h4>{username}</h4>
              <p>{message}</p>
          </div>
          {notSeen as number > 0 &&  <NotificationContainer>{notSeen}</NotificationContainer>}
        </Item>
    )
}
