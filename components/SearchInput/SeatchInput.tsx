import { FC } from "react";
import { MdSearch } from "react-icons/md";
import { Search } from "./SearchInput.styled";
import { InputProps } from "./SearchInput.types";


export const SeatchInput: FC<InputProps> = ({ onChange }) => {
    return (
        <Search>
          <MdSearch id="icon"/>
          <input onChange={onChange} placeholder="Enter email or username..."/>
        </Search>
    )
}
