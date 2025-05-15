import React, { useCallback, useEffect, useState } from "react";
import AuthRoutes from "./AuthRoutes";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Dashboard from "../Component/Dashboard/Dashboard";
import Chats from "../Component/Chat/Chat";
import Email from "../Component/Email/Email";
import Tickets from "../Component/Tickets/Tickets";
import Calendar from "../Component/Calendar/Calendar";
import CallManagement from "../Component/Call Management/CallManagement";
import Rating from "../Component/Rating/Rating";
import RemoteAccess from "../Component/Remote Access/RemoteAccess";
import Reports from "../Component/Reports/Reports";
import Settings from "../Component/Settings/Settings";
import MyAccount from "../Component/MyAccount";
import TicketOverView from "../Component/Tickets/TicketOverView";
import FinalReport from "../Component/Reports/FinalReport";
const Routing = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const accessDetails = localStorage.getItem("role_access");
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const handleResize = useCallback(() => {
    if (window.innerWidth < 850) {
      setSidebarOpen(false);
    } else if (!sidebarOpen) {
      setSidebarOpen(true);
      setMobileSidebar(false)
    }
  }, [sidebarOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, sidebarOpen]);

  useEffect(() => {
    handleResize();
    window.addEventListener("load", handleResize);

    return () => {
      window.removeEventListener("load", handleResize);
    };
  }, [handleResize]);
  
  return (
    <>
      {!accessDetails && (
        <AuthRoutes sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      {accessDetails === "SUPER_ADMIN" && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/register" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/userprofile"
              element={
                <MyAccount
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              } />
            <Route
              path="/chats"
              element={
                <Chats
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/email"
              element={
                <Email
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/tickets"
              element={
                <Tickets
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/ticketOverView/:id"
              element={
                <TicketOverView
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/setting"
              element={
                <Settings
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/calendar"
              element={
                <Calendar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/call"
              element={
                <CallManagement
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/rating"
              element={
                <Rating
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/remote"
              element={
                <RemoteAccess
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/reports"
              element={
                <Reports
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/reports/:report/:daily/:date"
              element={
                <FinalReport
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />

          </Routes>
        </BrowserRouter>
      )}
      {accessDetails === "EMPLOYEE" && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/register" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/userprofile"
              element={
                <MyAccount
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              } />
            <Route
              path="/chats"
              element={
                <Chats
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/email"
              element={
                <Email
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/tickets"
              element={
                <Tickets
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/ticketOverView/:id"
              element={
                <TicketOverView
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/setting"
              element={
                <Settings
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/calendar"
              element={
                <Calendar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/call"
              element={
                <CallManagement
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/rating"
              element={
                <Rating
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/remote"
              element={
                <RemoteAccess
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/reports"
              element={
                <Reports
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/reports/:report/:date"
              element={
                <FinalReport
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />

          </Routes>
        </BrowserRouter>
      )}
      {accessDetails === "CUSTOMER" && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/register" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/userprofile"
              element={
                <MyAccount
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              } />
            <Route
              path="/chats"
              element={
                <Chats
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/email"
              element={
                <Email
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/tickets"
              element={
                <Tickets
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/ticketOverView/:id"
              element={
                <TicketOverView
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/calendar"
              element={
                <Calendar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/call"
              element={
                <CallManagement
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
            <Route
              path="/rating"
              element={
                <Rating
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  mobileSidebar={mobileSidebar}
                  setMobileSidebar={setMobileSidebar}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default Routing;
