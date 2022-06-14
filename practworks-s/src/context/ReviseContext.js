import { createContext, useState } from "react";

export const ReviseContext = createContext();

export const ReviseProvider = ({ children }) => {
  const [reviseData, setReviseData] = useState({});

  return (
    <ReviseContext.Provider value={{ reviseData, setReviseData }}>
      {children}
    </ReviseContext.Provider>
  );
};
