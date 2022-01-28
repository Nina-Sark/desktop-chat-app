import { FC } from "react"
import { RotateSpinner } from "react-spinners-kit"
import { LoaderTypes } from "./Loader.stypes"
import { LoaderContainer } from "./LoaderContainer.styled"

export const Loader: FC<LoaderTypes> = ({ loading }) => {
    return (
        <LoaderContainer>
         <RotateSpinner size={80} color="#8437C5" loading={loading} />;
        </LoaderContainer>
    )
}
