import React, { useState } from "react";
import PropTypes from "prop-types";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import ReportDialog from "../Common/ReportDialog";
const Reports = ({ sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar }) => {
  Reports.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
    setSidebarOpen: PropTypes.func.isRequired,
    mobileSidebar: PropTypes.bool.isRequired,
    setMobileSidebar: PropTypes.func.isRequired,
  };
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState("");


  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
        <div className="bg-white flex-1 p-3 overflow-hidden">
          <div className="flex flex-col">
            <section className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 pb-5">
              <div className="font-bold text-xl">Employee Logs</div>
            </section>
            <section className="max-w-6xl mx-auto p-3">
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 lg:w-1/2 px-3 mb-3">
                  <div className="bg-side-nav shadow-xl rounded-xl p-5">
                    <div className="reportbox text-center">
                      <div className="fav4 fa-file-text-o text-6xl boxshadows rounded-full w-32 h-32 flex items-center justify-center mx-auto">
                        <IoDocumentTextOutline />
                      </div>

                      <h3 className="text-2xl font-medium cursor-pointer mt-3 mb-2 lg:h-12 md:h-16 h-12 flex items-center justify-center"
                        onClick={() => {
                          setSelectedReport("employeelogs")
                          setShowModal(true)
                        }}>
                        {/*<Link to="/employeelogs"> Employee Logs </Link>*/}
                        Employee Logs

                      </h3>
                      <p className="text-lg font-normal max-w-[280px] mx-auto">
                        Shoes For How Make Time Asset File Is Playing.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 px-3 mb-6">
                  <div className="bg-side-nav shadow-xl rounded-xl p-5">
                    <div className="reportbox text-center ">
                      <div className="fav4 fa-file-text-o text-6xl boxshadows rounded-full w-32 h-32 flex items-center justify-center mx-auto">
                        <IoDocumentTextOutline />
                      </div>
                      <h3 className="text-2xl font-medium cursor-pointer mt-3 mb-2 lg:h-12 md:h-16 h-12 flex items-center justify-center"
                        onClick={() => {
                          setSelectedReport("ticketlogs")
                          setShowModal(true)
                        }}>
                        Ticket Logs
                      </h3>
                      <p className="text-lg font-normal max-w-[280px] mx-auto">
                        Shoes For How Make Time Screen Is Displaying Content
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 px-3 mb-6">
                  <div className="bg-side-nav shadow-xl rounded-xl p-5">
                    <div className="reportbox text-center ">
                      <div className="fav4 fa-file-text-o text-6xl boxshadows rounded-full w-32 h-32 flex items-center justify-center mx-auto">
                        <IoDocumentTextOutline />
                      </div>
                      <h3 className="text-2xl font-medium cursor-pointer mt-3 mb-2 lg:h-12 md:h-16 h-12 flex items-center justify-center"
                        onClick={() => {
                          setSelectedReport("employeeperformancereport")
                          setShowModal(true)
                        }}>
                        Employee Performance Report
                      </h3>
                      <p className="text-lg font-normal max-w-[280px] mx-auto">
                        Shows Data About And Their Action
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 px-3 mb-6">
                  <div className="bg-side-nav shadow-xl rounded-xl p-5">
                    <div className="reportbox text-center ">
                      <div className="fav4 fa-file-text-o text-6xl boxshadows rounded-full w-32 h-32 flex items-center justify-center mx-auto">
                        <IoDocumentTextOutline />
                      </div>
                      <h3 className="text-2xl font-medium cursor-pointer mt-3 mb-2 lg:h-12 md:h-16 h-12 flex items-center justify-center"
                        onClick={() => {
                          setSelectedReport("auditreport")
                          setShowModal(true)
                        }}>
                        Audit Logs
                      </h3>
                      <p className="text-lg font-normal max-w-[280px] mx-auto">
                        Shows Data About And Their Action
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
      {showModal && (
        <ReportDialog toggleModal={toggleModal} selectedReport={selectedReport} />
      )}
    </>
  );
};

export default Reports;
