import React, { useContext } from "react";
import { reminderType } from "../models/reminderType.model";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ReminderContext } from "../context/ReminderProvider";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { useAppDispatch } from "../app/hooks";
import {
  addReminder,
  editReminder,
  getReminders,
} from "../features/reminderSlice";
const id: string = uuid();
interface PropsNewReminder {
  reminder?: reminderType;
  name: "Edit" | "New";
  setReminderOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewReminder = ({ reminder, name, setReminderOn }: PropsNewReminder) => {
  const { selectedDay } = useContext(ReminderContext);
  const dispatch = useAppDispatch();
  const INITIAL_FORM_STATE: reminderType = {
    id: reminder ? reminder.id : id,
    title: reminder ? reminder.title : "",
    city: reminder ? reminder.city : "",
    description: reminder ? reminder.description : "",
    dateTime: reminder
      ? reminder.dateTime
      : format(selectedDay, "yyyy-MM-dd'T'HH:mm:ss"),
  };

  const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string().max(30).required("Title is required"),
    city: Yup.string().max(30).required("City is required"),
    description: Yup.string(),
    dateTime: Yup.string().required("Date and time is required"),
  });

  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE,
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={(values) => {
        if (name === "New") {
          dispatch(addReminder(values));
          dispatch(getReminders(format(selectedDay, "dd/MM/yyyy")));
        }
        if (name === "Edit") {
          dispatch(editReminder(values));
        }
        setReminderOn(false);
      }}
    >
      {({
        isValid,
        dirty,
        handleBlur,
        errors,
        touched,
        handleChange,
        values,
      }) => (
        <Form className="bg-slate-100 p-2 my-2 rounded">
          <div>
            <h1 className="text-3xl font-bold">{name} Reminder</h1>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="firstname">Title</label>
              <input
                className="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400"
                type="text"
                name="title"
                id="firstname"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
              />
              <p className="text-red-600">
                {errors.title && touched.title && errors.title}
              </p>
            </div>
            <div className="w-1/2">
              <label htmlFor="lastname">City</label>
              <input
                className="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400"
                type="text"
                name="city"
                id="lastname"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
              />
              <p className="text-red-600">
                {errors.city && touched.city && errors.city}
              </p>
            </div>
          </div>
          <div>
            <label htmlFor="address">Description</label>
            <textarea
              className="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400"
              name="description"
              value={values.description}
              onChange={handleChange}
            />
          </div>
          <div className="sm:w-1/2 pb-4">
            <label htmlFor="address">Date and time</label>
            <input
              className="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400"
              type="datetime-local"
              name="dateTime"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.dateTime}
            />
            <p className="text-red-600">
              {errors.dateTime && touched.dateTime && errors.dateTime}
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              className="py-2 w-24 rounded-lg text-white  bg-red-500 hover:bg-red-600"
              type="button"
              onClick={() => setReminderOn(false)}
            >
              Cancel
            </button>
            <button
              className="py-2 w-32  rounded-lg text-white disabled:bg-slate-300  bg-red-500 hover:bg-red-600"
              type="submit"
              disabled={!isValid || !dirty}
            >
              {name} reminder
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewReminder;
