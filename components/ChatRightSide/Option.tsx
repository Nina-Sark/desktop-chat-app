import { chdir } from 'process';
import React, { FC, useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { OptionContainer, OptionTitle } from './Option.styles';

interface Props {
    children : React.ReactNode;
    title : string;
}

export const Option: FC<Props> = ({children, title}) => {

    const [expanded, setExpanded] = useState<boolean>(false);

  return <OptionContainer expanded={expanded}>
      <OptionTitle expanded={expanded} onClick={() => setExpanded(!expanded)}>
          <p>{title}</p>
          {expanded ? <MdExpandLess/> : <MdExpandMore/>}
      </OptionTitle>
      {children}
  </OptionContainer>;
};
