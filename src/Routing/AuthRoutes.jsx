import React from "react";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "../Pages/ForgotPassword";
const AuthRoutes = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Navigate to="/" />} />
          <Route path="/userprofile" element={<Navigate to="/" />} />
          <Route path="/chats" element={<Navigate to="/" />} />
          <Route path="/email" element={<Navigate to="/" />} />
          <Route path="/tickets" element={<Navigate to="/" />} />
          <Route path="/ticketOverView/:id" element={<Navigate to="/" />} />
          <Route path="/setting" element={<Navigate to="/" />} />
          <Route path="/calendar" element={<Navigate to="/" />} />
          <Route path="/call" element={<Navigate to="/" />} />
          <Route path="/rating" element={<Navigate to="/" />} />
          <Route path="/remote" element={<Navigate to="/" />} />
          <Route path="/reports" element={<Navigate to="/" />} />
          <Route path="/employeelogs" element={<Navigate to="/" />} />
          <Route path="/ticketlogs" element={<Navigate to="/" />} />
          <Route path="/employeeperformancereport" element={<Navigate to="/" />} />
          <Route path="/auditreport" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AuthRoutes;
