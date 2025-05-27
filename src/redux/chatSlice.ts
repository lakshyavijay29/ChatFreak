// store/chatSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type SessionChatMessage } from 'teleparty-websocket-lib'; // Adjust path as needed

interface ChatState {
  messages: SessionChatMessage[];
}

const initialState: ChatState = {
  messages: [],
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
  },
});

export const { addMessage, addMessages, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
