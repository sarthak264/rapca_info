import React from "react";
import { createContext, useState } from "react";
import { UserDataI } from "../types/UserDataType";

interface IUser {
  user: UserDataI | null;
  setUser: (val: UserDataI) => void;
}

const defaultValue: IUser = {
  user: null,
  setUser: () => undefined,
};

export const UserContext = createContext(defaultValue);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserDataI | null>(null);
  const SetValues = (val: UserDataI) => {
    setUser(val);
  };
  console.log({ userC: user });
  return (
    <UserContext.Provider value={{ user, setUser: SetValues }}>
      {children}
    </UserContext.Provider>
  );
};
