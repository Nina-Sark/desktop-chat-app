import { FC } from "react"
import { AvatarContainer, Circle, Container } from "./Avatar.styled"
import { IAvatarProps } from "./Avatar.types"

export const Avatar: FC<IAvatarProps> = ({ src, size, onClick, active }) => {
    return (
        <Container>
             {active && <Circle/>}
            <AvatarContainer size={size} src={src} onClick={onClick}/>
        </Container>
    )
}
