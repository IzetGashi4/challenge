import { format } from "date-fns";
import { Fragment, useContext, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import NewReminder from "./NewReminder";
import { reminderType } from "../models/reminderType.model";
import { useAppDispatch } from "../app/hooks";
import { deleteReducer, getReminders } from "../features/reminderSlice";
import { ReminderContext } from "../context/ReminderProvider";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface propReminderItem {
  reminder: reminderType;
}

export default function ReminderItem({ reminder }: propReminderItem) {
  const [editForm, setEditForm] = useState<boolean>(false);
  const { selectedDay } = useContext(ReminderContext);
  const dispatch = useAppDispatch();

  let dateTime = new Date(reminder.dateTime);
  return (
    <>
      {editForm ? (
        <NewReminder
          name="Edit"
          reminder={reminder}
          setReminderOn={setEditForm}
        />
      ) : (
        <li className="flex items-center justify-between px-4 py-2 my-4 space-x-4 group rounded-xl focus-within:bg-gray-100 shadow-md hover:shadow-lg	">
          <div className="max-w-sm w-full lg:max-w-full lg:flex">
            <div className="h-48 lg:h-auto object-cover bg-hero-pattern lg:w-48 flex-none flex	content-center	flex-col justify-center	 bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
              {reminder.weather?.temp && (
                <p className="text-white text-3xl">
                  {reminder.weather?.temp + "°F"}
                </p>
              )}
              <p className="text-white">{reminder.weather?.description}</p>
            </div>
            <div className=" bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <div className="text-gray-900 font-bold text-xl mb-2">
                  {reminder.title}
                </div>
                <p className="text-gray-700 text-base">
                  {reminder.description}
                </p>
              </div>
              <div className="flex items-center">
                <div className="text-sm">
                  <p className="text-gray-900 text-lg mb-2 leading-none">
                    City: {reminder.city}
                  </p>
                  <p className="text-gray-500 leading-none">
                    Time: {format(dateTime, "h:mm a")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Menu
            as="div"
            className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
          >
            <div>
              <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                <span className="sr-only">Open options</span>
                <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        // href="#"
                        onClick={() => setEditForm(true)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Edit
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        // href="#"
                        onClick={() => {
                          dispatch(deleteReducer(reminder.id));
                          dispatch(
                            getReminders(format(selectedDay, "dd/MM/yyyy"))
                          );
                        }}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Delete
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </li>
      )}
    </>
  );
}
