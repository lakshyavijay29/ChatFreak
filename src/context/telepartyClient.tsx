import React, { createContext, useContext, useRef } from 'react';
import { TelepartyClient } from 'teleparty-websocket-lib';

const TelepartyContext = createContext<{
  client: React.MutableRefObject<TelepartyClient | null>;
}>({ client: { current: null } });

export const TelepartyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const clientRef = useRef<TelepartyClient | null>(null);
  
  return (
    <TelepartyContext.Provider value={{ client: clientRef }}>
      {children}
    </TelepartyContext.Provider>
  );
};

export const useTelepartyClient = () => useContext(TelepartyContext);