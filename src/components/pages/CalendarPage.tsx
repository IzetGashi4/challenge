import { RemindersList } from "../RemindersList";
import Calendar from "../Calendar";

export default function CalendarPage() {
  return (
    <div className="py-16  ">
      <div className="max-w-4xl	px-4 mx-auto sm:px-7 md:max-w-6xl md:px-6 ">
        <div className="md:grid md:grid-cols-[1fr_2fr] md:divide-x md:divide-gray-300">
          <Calendar />
          <RemindersList />
        </div>
      </div>
    </div>
  );
}
