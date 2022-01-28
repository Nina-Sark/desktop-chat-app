import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleImageModal } from '../../state/reducers/ModalReducer';
import { STATE } from '../../state/store';
import { LinkComponent } from '../../styles/ChatPage.styles';
import { Image } from '../Message/Message.styles';
import { ModalContainer } from '../Modal/Modal.styled';
import { ImageModalProps } from './ImageModal.types';

export const ImageModal: FC = () => {

    const dispatch = useDispatch()

const imageModalData = useSelector((state: STATE) => state.modalState.imageModal);

const handleClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const el = e.target as unknown as HTMLDivElement;
    if (el.id === "content") return;
    dispatch(toggleImageModal({
      open : false,
      src : "",
      imageName : "",
      children : null
    }))
  };

  return  <ModalContainer 
  style={{ overflowY : "auto", padding : "40px 0" }}
  onClick={handleClose}
  open={imageModalData.open}>
    {imageModalData.children}
</ModalContainer>
};
