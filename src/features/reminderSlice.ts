import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { format } from "date-fns";
import { reminderType } from "../models/reminderType.model";

const API_KEY = "68GXNLELH2MSSN2UL9T9RQNVC";

interface initialStateType {
  allReminders: reminderType[];
  reminders: reminderType[];
}

const initialState: initialStateType = {
  allReminders: [],
  reminders: [],
};

export const getReminders = createAsyncThunk(
  "reminder/fetchreminder",
  async (selectedDay: string, thunkAPI: any) => {
    const state = thunkAPI.getState();
    let remindersForSelectedDay: reminderType[] = [];

    for (let i = 0; i < state.reminders.allReminders.length; i++) {
      let element = state.reminders.allReminders[i];
      let dateFormat: string | Date = new Date(element.dateTime);

      if (format(dateFormat, "dd/MM/yyyy") === selectedDay) {
        dateFormat = format(dateFormat, "yyyy-MM-dd");

        await axios
          .get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${element.city}/${dateFormat}/?unitGroup=us&key=${API_KEY}&contentType=json`
          )
          .then(({ data }) => {
            element = {
              ...element,
              weather: {
                description: data.days[0].description,
                temp: data.days[0].temp,
              },
            };
            remindersForSelectedDay.push(element);
          })
          .catch((err) => {
            element = {
              ...element,
              weather: {
                description: "No weather to display for given city.",
              },
            };
            remindersForSelectedDay.push(element);
          });
      }
    }

    return remindersForSelectedDay;
  }
);

const reminderSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    addReminder: (state, action) => {
      state.allReminders = [...state.allReminders, action.payload];
    },
    editReminder: (state, action) => {
      const id = action.payload.id;
      const allReminders = state.allReminders.filter((item) => item.id !== id);

      state.allReminders = [...allReminders, action.payload];
    },
    deleteReducer: (state, action) => {
      const id = action.payload;
      const allReminders = state.allReminders.filter((item) => item.id !== id);

      state.allReminders = [...allReminders];
    },
  },
  extraReducers(builder) {
    builder.addCase(getReminders.fulfilled, (state, action) => {
      state.reminders = action.payload;
    });
  },
});

export const { addReminder, editReminder, deleteReducer } =
  reminderSlice.actions;

export const selectAllReminders = (state: { reminders: initialStateType }) =>
  state.reminders.allReminders;

export const selectReminders = (state: { reminders: initialStateType }) =>
  state.reminders.reminders;

export default reminderSlice.reducer;
