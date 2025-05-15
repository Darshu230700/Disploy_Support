import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PropTypes from "prop-types";
import { FaNewspaper, FaRegNewspaper } from "react-icons/fa";
import { CgSandClock } from "react-icons/cg";
import { MdOutlineClose } from "react-icons/md";
import TicketList from "./TicketList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_TICKET, GetAllIssueReason } from "../../Pages/API";
import Footer from "../Footer";
import { getMenuAll, getMenuPermission } from "../../Redux/SidebarSlice";

const Tickets = ({ sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar }) => {
  Tickets.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
    setSidebarOpen: PropTypes.func.isRequired,
    mobileSidebar: PropTypes.bool.isRequired,
    setMobileSidebar: PropTypes.func.isRequired,
  };
  const dispatch = useDispatch()
  const { token, user } = useSelector((state) => state.root.auth);
  const authToken = `Bearer ${token}`;
  const [allTicketData, setAllTicketData] = useState({
    ticketData: [],
    SearchData: [],
    MasterCount: {}
  })
  const [issueList, setIsuueList] = useState([])
  const [loading, setLoading] = useState(false)
  const [permissions, setPermissions] = useState({
    isDelete: false,
    isSave: false,
    isView: false,
  });

  useEffect(() => {
    dispatch(getMenuAll()).then((item) => {
      const findData = item?.payload?.data?.modulemaster.find((e) => e?.pageName === "Tickets");
      if (findData) {
        const ItemID = findData?.moduleID;
        const payload = { UserRoleID: user?.userRoleID, ModuleID: ItemID };
        dispatch(getMenuPermission(payload)).then((permissionItem) => {
          if (
            Array.isArray(permissionItem?.payload?.data) && permissionItem?.payload?.data?.length > 0
          ) {
            setPermissions(permissionItem?.payload?.data[0]);
          }
        });
      }
    });
  }, []);



  const fetchData = () => {
    setLoading(true)
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: GET_ALL_TICKET,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    };
    axios.request(config)
      .then((response) => {
        setAllTicketData({
          ticketData: response?.data?.data?.model,
          SearchData: response?.data?.data?.model,
          MasterCount: response?.data?.data?.ticketMasterCounts,
        })
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  }

  const IssueList = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: GetAllIssueReason,
      headers: {
        Authorization: authToken,
      }
    };
    axios.request(config)
      .then((response) => {
        setIsuueList(response?.data?.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData()
    IssueList()
  }, [])


  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
        <main className="bg-white-500 flex-1 p-3 overflow-hidden">
          <div className="flex flex-col">
            <section className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 pb-5">
              <h1 className="font-bold text-xl">Tickets</h1>
            </section>
            <div className="flex-row mx-2">
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-3 mb-3 md:mb-0">
                  <div className="flex flex-col gap-2 bg-white shadow-xl rounded-xl p-3 border border-gray-200 relative">
                    <div className="icon-part">
                      <div className="flex bg-green-lighter w-14 h-14 p-3 rounded-full items-center justify-center">
                        <div className="fa fa-ticket-alt text-green-800 text-4xl">
                          <FaNewspaper />
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <h4 className="font-semibold text-2xl mb-0">{allTicketData?.MasterCount?.totalTickets}</h4>
                      <div className="text-lg text-gray-600">
                        Total Tickets
                      </div>
                    </div>
                    <span className="absolute top-10 right-0 text-sm text-gray-600 pr-3 ">
                      Than Last Week
                    </span>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-3 mb-3 md:mb-0">
                  <div className="flex flex-col gap-2 bg-white shadow-xl rounded-xl p-3 border border-gray-200 relative">
                    <div className="icon-part">
                      <div className="flex bg-orange-lighter w-14 h-14 p-3 rounded-full items-center justify-center">
                        <div className="fa fa-hourglass-half text-orange-400 text-4xl">
                          <CgSandClock />
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <h4 className="font-semibold text-2xl mb-0">{allTicketData?.MasterCount?.pendingTickets}</h4>
                      <div className="text-lg text-gray-600">Pending Tickets</div>
                    </div>
                    <span className="absolute top-10 right-0 text-sm text-gray-600 pr-3 ">
                      Than Last Week
                    </span>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-3 mb-3 md:mb-0">
                  <div className="flex flex-col gap-2 bg-white shadow-xl rounded-xl p-3 border border-gray-200 relative">
                    <div className="icon-part">
                      <div className="flex bg-red-lighter w-14 h-14 p-3 rounded-full items-center justify-center">
                        <div className="fa fa-times text-red-600 text-4xl">
                          <MdOutlineClose />
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <h4 className="font-semibold text-2xl mb-0">{allTicketData?.MasterCount?.closedTickets}</h4>
                      <div className="text-lg text-gray-600">Closed Tickets </div>
                    </div>
                    <span className="absolute top-10 right-0 text-sm text-gray-600 pr-3 ">
                      Than Last Week
                    </span>
                  </div>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-3 mb-3 md:mb-0">
                  <div className="flex flex-col gap-2 bg-white shadow-xl rounded-xl p-3 border border-gray-200 relative">
                    <div className="icon-part">
                      <div className="flex bg-blue-lighter w-14 h-14 p-3 rounded-full items-center justify-center">
                        <div className="fa fa-ticket-alt text-blue-800 text-4xl">
                          <FaRegNewspaper />
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <h4 className="font-semibold text-2xl mb-0">{allTicketData?.MasterCount?.reopenTickets}</h4>
                      <div className="text-lg text-gray-600">ReOpen Tickets</div>
                    </div>
                    <span className="absolute top-10 right-0 text-sm text-gray-600 pr-3 ">
                      Than Last Week
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <TicketList permissions={permissions} loading={loading} allTicketData={allTicketData} fetchData={fetchData} authToken={authToken} setAllTicketData={setAllTicketData} issueList={issueList} />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Tickets;
