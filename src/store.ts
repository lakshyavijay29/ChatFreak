import { configureStore } from "@reduxjs/toolkit";
import telepartyClientReducer from "./redux/telepartyClientSlice";
import chatReducer from './redux/chatSlice'

export const store = configureStore({
  reducer: {
    telepartyClient: telepartyClientReducer,
    chat: chatReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
