import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PropTypes from "prop-types";
import { RemoteAccessList } from "../Common/Common";
import Footer from "../Footer";
const RemoteAccess = ({ sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar }) => {
  RemoteAccess.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
    setSidebarOpen: PropTypes.func.isRequired,
    mobileSidebar: PropTypes.bool.isRequired,
    setMobileSidebar: PropTypes.func.isRequired,
  };
  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
        <main className="bg-white-300 flex-1 p-3 overflow-hidden">
          <div className="flex flex-col">
            <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 pb-5">
              <div className="font-bold text-xl">Remote Access</div>
            </div>
            <div className="flex flex-1 flex-col md:flex-row lg:flex-row mb-5">
              <div className=" p-2 md:w-1/4">
                <div className="p-4 flex flex-col">
                  <div className="flex justify-center">
                    <button className="w-40 p-2 rounded-full bg-blue-200 text-blue">Screens</button>
                  </div>
                </div>
              </div>
              <div className=" p-2 md:w-1/4">
                <div className="p-4 flex flex-col">
                  <div className="flex justify-center">
                    <button className="w-40 p-2 rounded-full bg-blue-200 text-blue">Phone Number</button>
                  </div>
                </div>
              </div>
              <div className=" p-2 md:w-1/4">
                <div className="p-4 flex flex-col">
                  <div className="flex justify-center">
                    <button className="w-40 p-2 rounded-full bg-blue-200 text-blue">Connected Date</button>
                  </div>
                </div>
              </div>
              <div className=" p-2 md:w-1/4">
                <div className="p-4 flex flex-col">
                  <div className="flex justify-center">
                    <button className="w-40 p-2 rounded-full bg-blue-200 text-blue">Screen Location</button>
                  </div>
                </div>
              </div>
              <div className=" p-2 md:w-1/4">
                <div className="p-4 flex flex-col">
                  <div className="flex justify-center">
                    <button className="w-40 p-2 rounded-full bg-blue-200 text-blue">Remote Access</button>
                  </div>
                </div>
              </div>
            </div>
            {RemoteAccessList?.map((item)=>{
              return(
                <div className=" shadow-md flex flex-1 flex-col md:flex-row lg:flex-row mb-5">
                  <div className="p-6 md:w-1/4 flex items-center justify-center">
                    <div className="flex flex-col">
                      <div className="flex justify-center">
                        <label className="p-2 rounded-full text-black">{item?.screenName}</label>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:w-1/4 flex items-center justify-center">
                    <div className="flex flex-col">
                      <div className="flex justify-center">
                        <label className="p-2 rounded-full text-black">{item?.phoneNumber}</label>
                      </div>
                    </div>
                  </div>
                  <div className=" p-6 md:w-1/4 flex items-center justify-center">
                    <div className="flex flex-col">
                      <div className="flex justify-center">
                        <label className="p-2 rounded-full text-black">{item?.connected}</label>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:w-1/4 flex items-center justify-center">
                    <div className="flex flex-col">
                      <div className="flex justify-center">
                        <label className="p-2 rounded-full text-black">{item?.screenLocation}</label>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:w-1/4 flex items-center justify-center">
                    <div className="flex flex-col">
                      <div className="flex justify-center">
                        <button className="w-40 p-2 rounded-full bg-green font-medium text-white">Connect</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>
        </main>
      </div>
      <Footer/>
    </>
  );
};

export default RemoteAccess;
