import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ChatReducer from "./reducers/ChatReducer";
import FilterReducer from "./reducers/FilterReducer";
import ModalReducer from "./reducers/ModalReducer";


const reducers = combineReducers({
   modalState : ModalReducer,
   filterState : FilterReducer,
   chat : ChatReducer
})

const store = configureStore({
    reducer : reducers
})


export type STATE = ReturnType<typeof store.getState>

export default store;