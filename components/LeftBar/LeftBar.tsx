import { useRouter } from "next/router"
import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useDispatch } from "react-redux"
import { auth } from "../../db/firebase"
import { signOutHandler, updateUserDB } from "../../db/utils"
import { Data } from "../../pages/account/[email]"
import { filterData, getFilterValue } from "../../state/reducers/FilterReducer"
import { theme } from "../../styles/Theme"
import { Avatar } from "../Avatar/Avatar"
import { ChatListItem } from "../ChatListItem/ChatListItem"
import { SeatchInput } from "../SearchInput/SeatchInput"
import { AvatarHeader, Bar, Header, Icon, IconButton } from "./LeftBar.styled"
import Cookies from "js-cookie";

//data[0]
export const LeftBar = ({ data } : { data : Data[]}) => {
    console.log(data)
    const [user] = useAuthState(auth);
    const dispatch = useDispatch()

    const router = useRouter()

    const signOut = async () => {
        await signOutHandler()
        await updateUserDB(user?.email as string);
        Cookies.remove("currentUser");
        router.push(`/`)
    }

    const handleFilterValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const input = (e.target as unknown) as HTMLInputElement;
        dispatch(getFilterValue(input.value))
        dispatch(filterData())
    }

    return (
        <Bar>
            <Header>
                <AvatarHeader>
                  <div>
                    <Avatar size={60} src={user?.photoURL as string} onClick={signOut}/>
                    <h1>{user?.displayName}</h1>
                  </div>
                  <IconButton size={40} bg={theme.colors.bg} hoverBg={theme.colors.bgHover}>
                      <Icon/>
                  </IconButton>
                </AvatarHeader>
                <SeatchInput onChange={handleFilterValueChange}/>
            </Header>
            <div>
            {data.map(({ id, participant, lastActive, message, notSeenMessages }) => (
                 <>
                <ChatListItem 
                onClick={() => router.push(`/chat/${id}`)}
                size={45}
                key={id}
                id={id}
                src={participant.photo}
                username={participant.username} 
                message={message} 
                width={"60px"}
                active={participant.lastActive == null ? true : false}
                notSeen={notSeenMessages?.length}/>
                 </>
            ))}
            </div>
        </Bar>
    )
}
