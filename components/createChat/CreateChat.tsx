import { Container } from "./CreateChat.styled"
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../state/reducers/ModalReducer";

export const CreateChat = () => {

    const dispatch = useDispatch()

    const handleToggleModal = (): void => {
        dispatch(toggleModal())
    }

    return (
        <Container>
            <button onClick={handleToggleModal}>
                <MdAdd/>
            </button>
            <h2>Create New Chat Or Click One To Open</h2>
        </Container>
    )
}
