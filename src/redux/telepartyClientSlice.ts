import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TelepartyClient, type SocketEventHandler } from "teleparty-websocket-lib";

interface TelepartyClientState {
  client: TelepartyClient | null;
}

const initialState: TelepartyClientState = {
  client: null,
};

const telepartyClientSlice = createSlice({
  name: "telepartyClient",
  initialState,
  reducers: {
    setClient: (state, action: PayloadAction<TelepartyClient>) => {
      state.client = action.payload;
    },
    clearClient: (state) => {
      state.client?.teardown();
      state.client = null;
    },
  },
});

export const { setClient, clearClient } = telepartyClientSlice.actions;
export default telepartyClientSlice.reducer;
