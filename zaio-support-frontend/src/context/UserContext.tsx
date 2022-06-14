import React from "react";
import { createContext, useState } from "react";
import { UserValuesI } from "../services/user.service";

interface IUser {
  user:
    | (UserValuesI & { email: string; type: "client" | "tutor" | "user" })
    | null;
  setUser: (
    val:
      | (UserValuesI & { email: string; type: "client" | "tutor" | "user" })
      | null
  ) => void;
}

const defaultValue: IUser = {
  user: null,
  setUser: () => undefined,
};

export const UserContext = createContext(defaultValue);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<
    (UserValuesI & { email: string; type: "client" | "tutor" | "user" }) | null
  >(null);
  const SetValues = (
    val:
      | (UserValuesI & { email: string; type: "client" | "tutor" | "user" })
      | null
  ) => {
    setUser(val);
  };
  console.log({ userC: user });
  return (
    <UserContext.Provider value={{ user, setUser: SetValues }}>
      {children}
    </UserContext.Provider>
  );
};
