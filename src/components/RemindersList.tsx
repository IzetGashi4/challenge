import { format, isSameDay, parseISO } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ReminderContext } from "../context/ReminderProvider";
import { getReminders, selectReminders } from "../features/reminderSlice";
import { reminderType } from "../models/reminderType.model";
import NewReminder from "./NewReminder";
import ReminderList from "./ReminderItem";

export const RemindersList = () => {
  const [addReminder, setAddReminder] = useState<boolean>(false);
  const reminders = useAppSelector(selectReminders);
  const dispatch = useAppDispatch();
  const { selectedDay } = useContext(ReminderContext);

  useEffect(() => {
    dispatch(getReminders(format(selectedDay, "dd/MM/yyyy")));
  }, [selectedDay, dispatch]);

  let selectedDayMeetings = reminders.filter((reminder: reminderType) =>
    isSameDay(parseISO(reminder.dateTime), selectedDay)
  );
  
  return (
    <section className="mt-12 md:mt-0 md:pl-14 	">
      <div className="flex items-center gap-5 sm:gap-10 	">
        <h2 className="font-semibold text-lg	 text-gray-900">
          Schedule for {format(selectedDay, "MMM dd, yyy")}
        </h2>
        {!addReminder && (
          <button
            className="p-2 rounded-lg text-white  bg-red-500 hover:bg-red-600"
            onClick={() => setAddReminder(true)}
          >
            Add a reminder
          </button>
        )}
      </div>
      {addReminder && <NewReminder name="New" setReminderOn={setAddReminder} />}
      <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
        {!!selectedDayMeetings.length ? (
          selectedDayMeetings.map((reminder: reminderType) => (
            <ReminderList reminder={reminder} key={reminder.id} />
          ))
        ) : (
          <p className="text-base">No meetings for today.</p>
        )}
      </ol>
    </section>
  );
};
