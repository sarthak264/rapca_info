import React from "react";
import { createContext, useState } from "react";

interface IAgoraClient {
  agoraClientToken: string | null;
  setAgoraClientToken: (val: string) => void;
}

const defaultValue: IAgoraClient = {
  agoraClientToken: null,
  setAgoraClientToken: () => undefined,
};

export const AgoraClientContext = createContext(defaultValue);

export const AgoraClientProvider: React.FC = ({ children }) => {
  const [agoraClientToken, setAgoraClientToken] = useState<string | null>(null);
  const SetId = (val: string) => {
    setAgoraClientToken(val);
  };
  return (
    <AgoraClientContext.Provider
      value={{ agoraClientToken, setAgoraClientToken: SetId }}
    >
      {children}
    </AgoraClientContext.Provider>
  );
};
