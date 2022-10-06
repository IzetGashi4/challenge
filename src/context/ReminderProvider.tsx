import { startOfToday } from "date-fns";
import { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type ReminderType = {
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
};

export const ReminderContext = createContext({} as ReminderType);

export const ReminderProvider = ({ children }: Props) => {
  let today = startOfToday();
  const [selectedDay, setSelectedDay] = useState<Date>(today);

  return (
    <ReminderContext.Provider value={{ selectedDay, setSelectedDay }}>
      {children}
    </ReminderContext.Provider>
  );
};
