import { createSlice } from "@reduxjs/toolkit";
import { STATE } from "../store";
import {
  GET_DATA_ACTION,
  GET_FILE_ACTION,
  GET_MESSAGE_REF_ACTION,
  GET_MESSAGE_TO_REPLY_TO_ACTION,
  GET_SELECTED_CHAT_THEME,
  GET_SHOW_BTN_ACTION,
  InitialStateI,
} from "../types/ChatTypes";


 const colors: string[] = [
    "#FF1493",
    "#6A5ACD",
    "#DC143C",
    "#FF4500",
    "#229954",
    "#E5E7E9",
    "#AAB7B8",
  ];

const initialState: InitialStateI = {
  participant: {},
  messages: [],
  messageRef: null,
  showDownBtn: false,
  messageToReplyTo: null,
  file: null,
  chatTheme : [
     {
       chat : {
         bg : "#FF1493",
         fontColor : "#fff"
       },
       receiverChat : {
         bg : "#F5D7F9",
         fontColor : "#000"
       },
       currentUserChat : {
         bg : "#61084A",
         fontColor : "#fff"
       },
       replyChat : {
         bg : "#D2B4DE",
         fontColor : "#000"
       },
       upButton : {
         bg : "#61084A",
         fontColor : "#fff",
         hover : {
           receiver : "#ecaef5",
           currentUser : "#800460"
         }
       }
     },
     {
       chat : {
         bg : "#6A5ACD",
         fontColor : "#fff"
       },
       receiverChat : {
         bg : "#8a82ba",
         fontColor : "#000"
       },
       currentUserChat : {
         bg : "#282152",
         fontColor : "#fff"
       },
       replyChat : {
         bg : "#b0a3ff",
         fontColor : "#000"
       },
       upButton : {
         bg : "#282152", 
         fontColor : "#fff",
         hover : {
           receiver : "#6b6594",
           currentUser : "#3c3278"
         }
       }
     },
     {
       chat : {
         bg : "#DC143C",
         fontColor : "#fff"
       },
       receiverChat : {
         bg : "#ad3d53",
         fontColor : "#fff"
       },
       currentUserChat : {
         bg : "#780119",
         fontColor : "#fff"
       },
       replyChat : {
         bg : "#f58ca1",
         fontColor : "#000"
       },
       upButton : {
        bg : "#780119",
        fontColor : "#fff",
        hover : {
          receiver : "#912d41",
          currentUser : "#9e0826"
        }
       }
     },
     {
       chat : {
         bg : "#FF4500",
         fontColor : "#fff"
       },
       receiverChat : {
         bg : "#fc6d38",
         fontColor : "#000"
       },
       currentUserChat : {
         bg : "#b84216",
         fontColor : "#fff"
       },
       replyChat : {
         bg : "#ffa280",
         fontColor : "#000",
       },
       upButton : {
        bg : "#b84216",
        fontColor : "#fff",
        hover : {
          receiver : "#ed8058",
          currentUser : "#d95423"
        }
       }
     },
     {
       chat : {
         bg : "#229954",
         fontColor : "#fff"
       },
       receiverChat : {
          bg : "#3deb86",
          fontColor : "#000"
       },
       currentUserChat : {
         bg : "#00ff6b",
         fontColor : "#000"
       },
       replyChat : {
         bg : "#9cffc5",
         fontColor : "#000"
       },
       upButton : {
        bg : "#00ff6b",
        fontColor : "#000",
        hover : {
          receiver : "#4ccf83",
          currentUser : "#06d15b"
        }
       }
     },
     {
       chat : {
         bg : "#E5E7E9",
         fontColor : "#000"
       },
       receiverChat : {
         bg : "#8b8c8c",
         fontColor : "#fff"
       },
       currentUserChat : {
         bg : "#444545",
         fontColor : "#fff"
       },
       replyChat : {
         bg : "#b0b0b0",
         fontColor : "#000"
       },
       upButton : {
        bg : "#444545",
        fontColor : "#fff",
        hover : {
          receiver : "#777878",
          currentUser : "#565757"
        }
       }
     },
     {
       chat : {
         bg : "#AAB7B8",
         fontColor : "#000"
       },
       receiverChat : {
         bg : "#66d5de",
         fontColor : "#000"
       },
       currentUserChat : {
         bg : "#00ecff",
         fontColor : "#000"
       },
       replyChat : {
         bg : "#9adee3",
         fontColor : "#000"
       },
       upButton : {
        bg : "#00ecff",
        fontColor : "#000",
        hover : {
          receiver : "#5abcc4",
          currentUser : "#00bdcc"
        }
       }
     }
  ],
  selectedChatTheme : null
};

const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getData: (state: InitialStateI, action: GET_DATA_ACTION): InitialStateI => {
      const { participant, messages } = action.payload;

      return {
        ...state,
        participant,
        messages,
      };
    },
    getMessageRef: (
      state: InitialStateI,
      action: GET_MESSAGE_REF_ACTION
    ): InitialStateI => {
      return {
        ...state,
        messageRef: action.payload,
      };
    },
    getShowDownBtn: (
      state: InitialStateI,
      action: GET_SHOW_BTN_ACTION
    ): InitialStateI => {
      return {
        ...state,
        showDownBtn: action.payload,
      };
    },
    getMessageToReplyTo: (
      state: InitialStateI,
      action: GET_MESSAGE_TO_REPLY_TO_ACTION
    ): InitialStateI => {
      return {
        ...state,
        messageToReplyTo: action.payload,
      };
    },
    getFile: (state: InitialStateI, action: GET_FILE_ACTION): InitialStateI => {
      return {
        ...state,
        file: action.payload,
      };
    },
    getSelectedChatTheme: (state: InitialStateI, action: GET_SELECTED_CHAT_THEME): InitialStateI => {
        return {
          ...state,
          selectedChatTheme : action.payload
        }
    }
  },
});

export const {
  getData,
  getMessageRef,
  getShowDownBtn,
  getMessageToReplyTo,
  getFile,
  getSelectedChatTheme
} = ChatSlice.actions;

export default ChatSlice.reducer;
