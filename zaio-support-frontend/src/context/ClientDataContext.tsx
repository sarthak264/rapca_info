import React from "react";
import { createContext, useState } from "react";
import { IClientData } from "../services/client.service";

interface IClientDataContext {
  clientData: IClientData | null;
  setClientData: (data: IClientData) => void;
}

const defaultValue: IClientDataContext = {
  clientData: null,
  setClientData: () => undefined,
};

export const ClientDataContext = createContext(defaultValue);

export const ClientDataProvider: React.FC = ({ children }) => {
  const [clientData, setClientData] = useState<IClientData | null>(null);
  const SetData = (data: IClientData) => {
    setClientData(data);
  };
  return (
    <ClientDataContext.Provider value={{ clientData, setClientData: SetData }}>
      {children}
    </ClientDataContext.Provider>
  );
};
