// store/chatSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type SessionChatMessage } from 'teleparty-websocket-lib'; // Adjust path as needed

interface ChatState {
  messages: SessionChatMessage[];
  isSomeoneTyping: boolean;
}

const initialState: ChatState = {
  messages: [],
  isSomeoneTyping: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<SessionChatMessage>) => {
      state.messages.push(action.payload);
    },
    addMessages: (state, action: PayloadAction<SessionChatMessage[]>) => {
      state.messages = [...state.messages, ...action.payload];
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setTypingPresence: (state, action: PayloadAction<boolean>) => {
      state.isSomeoneTyping = action.payload;
    },
  },
});

export const { addMessage, addMessages, clearMessages, setTypingPresence  } = chatSlice.actions;
export default chatSlice.reducer;
