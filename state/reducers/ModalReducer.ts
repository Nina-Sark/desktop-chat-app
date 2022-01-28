import { createSlice } from "@reduxjs/toolkit"
import { GET_IMAGE_MODAL_DATA, IModal } from "../types/ModalTypes"

const initialState: IModal = {
   open : false,
   imageModal : {
    open : false,
    src : "",
    imageName : ""
  },
}


const ModalSlice = createSlice({
    name : "modal-slice",
   initialState,
   reducers : {
       toggleModal : (state: IModal): IModal => {
           return {
               ...state,
               open : !state.open
           }
       },
       toggleImageModal : (state: IModal, action: GET_IMAGE_MODAL_DATA): IModal => {
           console.log(action.payload)
           return {
               ...state,
               imageModal : action.payload
           }
       }
   }
})


export const { toggleModal, toggleImageModal } = ModalSlice.actions;

export default ModalSlice.reducer