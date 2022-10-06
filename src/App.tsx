import React from "react";
import Calendar from "./components/pages/CalendarPage";
import { Route, Routes, Navigate } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/calendar" element={<Calendar />} />
      <Route path="*" element={<Navigate to={"/calendar"} replace />} />
    </Routes>
  );
};

export default App;
