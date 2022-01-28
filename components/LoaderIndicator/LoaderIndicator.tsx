import React, { FC } from 'react';
import { LoaderIndicatorContainer } from './LoaderIndicator.styles';
import { LoaderIndictorProps } from './LoaderIndictor.types';

export const LoaderIndicator: FC<LoaderIndictorProps> = ({ progress, fileName }) => {
  return <LoaderIndicatorContainer>
      <div style={{ width : `${progress}%` }}></div>
      <span>{fileName}</span>
  </LoaderIndicatorContainer>;
};
