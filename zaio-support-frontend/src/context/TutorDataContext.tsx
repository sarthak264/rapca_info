import React from "react";
import { createContext, useState } from "react";
import { ITutorData } from "../services/tutor.service";

interface ITutorDataContext {
  tutorData: ITutorData | null;
  setTutorData: (data: ITutorData) => void;
}

const defaultValue: ITutorDataContext = {
  tutorData: null,
  setTutorData: () => undefined,
};

export const TutorDataContext = createContext(defaultValue);

export const TutorDataProvider: React.FC = ({ children }) => {
  const [tutorData, setTutorData] = useState<ITutorData | null>(null);
  const SetData = (data: ITutorData) => {
    setTutorData(data);
  };
  return (
    <TutorDataContext.Provider value={{ tutorData, setTutorData: SetData }}>
      {children}
    </TutorDataContext.Provider>
  );
};
