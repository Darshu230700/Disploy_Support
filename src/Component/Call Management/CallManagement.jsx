import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PropTypes from "prop-types";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import AllCalls from "./AllCalls";
import InboundCalls from "./InboundCalls";
import OutboundCalls from "./OutboundCalls";
import AbandonedCalls from "./AbandonedCalls";
import Voicemail from "./Voicemail";
import CallRecording from "./CallRecording";
import Footer from "../Footer";
const CallManagement = ({ sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar }) => {
  CallManagement.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
    setSidebarOpen: PropTypes.func.isRequired,
    mobileSidebar: PropTypes.bool.isRequired,
    setMobileSidebar: PropTypes.func.isRequired,
  };
  const [activeTab, setActiveTab] = useState("allcallls");

  const data = [
    {
      label: "All Calls",
      value: "allcallls",
      desc: <AllCalls />,
    },
    {
      label: "Inbound Calls",
      value: "inboundcalls",
      desc: <InboundCalls />,
    },
    {
      label: "Outbound Calls",
      value: "outboundcalls",
      desc: <OutboundCalls />,
    },
    {
      label: "Abandoned Calls",
      value: "abandonedcalls",
      desc: <AbandonedCalls />,
    },
    {
      label: "Voicemail",
      value: "voicemail",
      desc: <Voicemail />,
    },
    {
      label: "Call Recording",
      value: "callrecording",
      desc: <CallRecording />,
    },
  ];

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
        <main className="bg-white-300 flex-1 p-3 overflow-hidden">
          <section className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 pb-5">
            <div className="font-bold text-xl">Call Management</div>
          </section>
          <div className="mt-5 page-contain">
            <Tabs value={activeTab}>
              <TabsHeader className="p-0 text-primary flex justify-between">
                {data.map(({ icon, label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={`${activeTab === value
                      ? "text-white items-center rounded-full bg-primary "
                      : ""
                      } w-40 py-3 px-4 border border-primary  rounded-full mx-2`}
                  >
                    <div className="flex items-center">
                      {label}
                    </div>
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody className="p-0">
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer/>
    </>
  );
};

export default CallManagement;
