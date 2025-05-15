import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PropTypes from "prop-types";
import {
  FaDownload,
  FaFileInvoiceDollar,
  FaMedal,
  FaPaste,
  FaReceipt,
  FaRegCalendarPlus,
  FaTags,
  FaUserAlt,
} from "react-icons/fa";
import User from "./User";
import UserRole from "./UserRole";
import Billing from "./Billing";
import Invoice from "./Invoice";
import MyPlan from "./MyPlan";
import Discount from "./Discount";
import CreateAPI from "./CreateAPI";
import InvoiceBilling from "./InvoiceBilling";
import UserInfo from "./UserInfo";
import CustomerInfo from "./CustomerInfo";
import { debounce } from "lodash";
import { ADDUPDATE_USERROLE, GET_ALL_BILLING, baseUrl, customerURL } from "../../Pages/API";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPrinterFill, BsFillSendFill } from "react-icons/bs";
import html2pdf from 'html2pdf.js';
import ReactToPrint from "react-to-print";
import { getMenuAll, getMenuPermission } from "../../Redux/SidebarSlice";

const Settings = ({ sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar }) => {
  Settings.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
    setSidebarOpen: PropTypes.func.isRequired,
    mobileSidebar: PropTypes.bool.isRequired,
    setMobileSidebar: PropTypes.func.isRequired,
  };
  const dispatch = useDispatch()
  const { token, user } = useSelector((state) => state.root.auth);
  const authToken = `Bearer ${token}`;
  const InvoiceRef = useRef(null);
  const [tab, setTab] = useState(1); // Initialize tab state with default value 1
  const [searchValue, setSearchValue] = useState("");
  const [allUserRoleData, setAllUserRoleData] = useState({
    userRoleData: [],
    SearchData: []
  })
  const [allUserData, setAllUserData] = useState({
    userData: [],
    SearchData: []
  })
  const [billingData, setBillingData] = useState({
    billData: [],
    SearchData: []
  })
  const [permissions, setPermissions] = useState({
    isDelete: false,
    isSave: false,
    isView: false,
  });
  const [userLoading, setUserLoading] = useState(false);
  const [userRoleLoading, setUserRoleLoading] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false)
  // console.log('permissions :>> ', permissions);

  useEffect(() => {
    dispatch(getMenuAll()).then((item) => {
      const findData = item.payload.data.modulemaster.find((e) => e.pageName === "Setting");
      if (findData) {
        const ItemID = findData.moduleID;
        const payload = { UserRoleID: user.userRoleID, ModuleID: ItemID };
        dispatch(getMenuPermission(payload)).then((permissionItem) => {
          if (
            Array.isArray(permissionItem.payload.data) && permissionItem.payload.data.length > 0
          ) {
            setPermissions(permissionItem.payload.data[0]);
          }
        });
      }
    });
  }, []);


  const handleTabClick = (newTab) => {
    setTab(newTab); // Update tab state when a tab is clicked
    setShowInvoice(false)
  };


  const fetchUserRoleData = () => {
    setUserRoleLoading(true)
    let Params = JSON.stringify({
      "mode": "Selectlist"
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ADDUPDATE_USERROLE,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      data: Params
    };
    axios.request(config)
      .then((response) => {
        setAllUserRoleData({
          userRoleData: response?.data?.data,
          SearchData: response?.data?.data
        })
        setUserRoleLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setUserRoleLoading(false)
      });
  }

  const fetchUserData = () => {
    setUserLoading(true)
    let URL = "";
    if (user?.loginType === "Employee") {
      URL = `${baseUrl}GetEmployeeMaster`;
    } else {
      URL = `${customerURL}GetCustomerMaster`
    }
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: URL,
      headers: {
        Authorization: authToken,
      },
    };
    axios.request(config)
      .then((response) => {
        setAllUserData({
          userData: response?.data?.data,
          SearchData: response?.data?.data
        })
        setUserLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setUserLoading(false)
      });
  }

  const fetchBillingData = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: GET_ALL_BILLING,
      headers: {
        Authorization: authToken,
      },
    };
    axios.request(config)
      .then((response) => {
        setBillingData({
          billData: response?.data?.data,
          SearchData: response?.data?.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }
  const debouncedOnChange = debounce(handleChange, 500);

  const DownloadInvoice = () => {
    const InvoiceNode = InvoiceRef.current;
    if (InvoiceNode) {
      html2pdf(InvoiceNode, {
        margin: 10,
        filename: 'Invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      });
    }
  }

  // const handlePrint = () => {
  //   const InvoiceNode = InvoiceRef.current;
  //   if (InvoiceNode) {
  //     const printWindow = window.open('', '_blank');
  //     printWindow.document.write('<html><head><title>Print</title></head><body>');
  //     printWindow.document.write(InvoiceNode.innerHTML);
  //     printWindow.document.write('</body></html>');
  //     printWindow.document.close();
  //     printWindow.print();
  //   }
  // };



  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
        <main className="bg-white-medium flex-1 p-3 overflow-hidden">
          <div className="flex flex-col">
            <section className="flex flex-1 flex-row md:flex-row lg:flex-row mx-2 pb-5 items-center justify-between">
              <h1 className="font-bold text-xl">Settings</h1>
              {tab === 2 && (
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-black rounded-full w-56 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search"
                    onChange={(e) => debouncedOnChange(e)}
                  />
                </div>
              )}
              {showInvoice && (
                <div className="flex">
                  <button
                    type='button'
                    className="px-5 bg-primary flex items-center gap-2 text-white rounded-full py-2 border border-primary me-3 "
                  >
                    <BsFillSendFill />
                    Send Invoice
                  </button>
                  <button
                    className="bg-white text-primary text-base px-5 flex items-center gap-2 py-2 border border-primary  shadow-md rounded-full hover:bg-primary hover:text-white mr-2"
                    type="button"
                    onClick={() => DownloadInvoice()}
                  >
                    <FaDownload />
                    Download
                  </button>
                  <ReactToPrint
                    trigger={() => <button
                      className="bg-white text-primary text-base px-5 flex items-center gap-2 py-2 border border-primary  shadow-md rounded-full hover:bg-primary hover:text-white mr-2"
                      type="button"
                    >
                      <BsFillPrinterFill />
                      Print
                    </button>}
                    content={() => InvoiceRef.current}
                  />

                </div>
              )}
            </section>
            <div
              className="flex lg:flex-row md:flex-row sm:flex-row flex-col items-stretch justify-center w-full"
              x-data="{tab: 1}">
              <div className="flex flex-col justify-start w-full md:w-2/6 lg:w-1/5 sm:w-2/5">
                <a
                  className={`p-3 text-lg font-semibold flex items-center gap-2 ${tab === 1
                    ? "z-20 settingtabactive border-blue-500 m-0"
                    : "m-0 cursor-pointer"
                    }`}
                  onClick={() => handleTabClick(1)}>
                  <div className="fa fa-user">
                    <FaUserAlt />
                  </div>
                  Users
                </a>
                <a
                  className={`p-3 text-lg font-semibold flex items-center gap-2 ${tab === 2
                    ? "z-20 settingtabactive border-blue-500 m-0"
                    : "m-0 cursor-pointer"
                    }`}
                  onClick={() => handleTabClick(2)}>
                  <div className="fa fa-medal">
                    <FaMedal />
                  </div>
                  Users Role
                </a>
                <a
                  className={`p-3 text-lg font-semibold flex items-center gap-2 ${tab === 3
                    ? "z-20 settingtabactive border-blue-500 m-0"
                    : "m-0 cursor-pointer"
                    }`}
                  onClick={() => handleTabClick(3)}>
                  <div className="fa fa-file-invoice-dollar">
                    <FaFileInvoiceDollar />
                  </div>
                  Billing
                </a>
                <a
                  className={`p-3 text-lg font-semibold flex items-center gap-2 ${tab === 4
                    ? "z-20 settingtabactive border-blue-500 m-0"
                    : "m-0 cursor-pointer"
                    }`}
                  onClick={() => handleTabClick(4)}>
                  <div className="fa fa-receipt">
                    <FaReceipt />
                  </div>
                  Invoice
                </a>
                <a
                  className={`p-3 text-lg font-semibold flex items-center gap-2 ${tab === 5
                    ? "z-20 settingtabactive border-blue-500 m-0"
                    : "m-0 cursor-pointer"
                    }`}
                  onClick={() => handleTabClick(5)}>
                  <div className="fa fa-regular fa-paste">
                    <FaPaste />
                  </div>
                  My Plan
                </a>
                <a
                  className={`p-3 text-lg font-semibold flex items-center gap-2 ${tab === 6
                    ? "z-20 settingtabactive border-blue-500 m-0"
                    : "m-0 cursor-pointer"
                    }`}
                  onClick={() => handleTabClick(6)}>
                  <div className="fa fa-tags">
                    <FaTags />
                  </div>
                  Discount
                </a>
                <a
                  className={`p-3 text-lg font-semibold flex items-center gap-2 ${tab === 7
                    ? "z-20 settingtabactive border-blue-500 m-0"
                    : "m-0 cursor-pointer"
                    }`}
                  onClick={() => handleTabClick(7)}>
                  <div className="fa fa-calendar-plus">
                    <FaRegCalendarPlus />
                  </div>
                  Create API
                </a>
              </div>
              <div className="md:w-4/5 lg:w-4/5 sm:w-full">
                <div
                  className={`bg-white shadow-2xl border border-light-blue p-5 rounded-xl ${tab === 1 ? "block" : "hidden"
                    }`}>
                  <User permissions={permissions} allUserRoleData={allUserRoleData} allUserData={allUserData} setAllUserData={setAllUserData} fetchUserData={fetchUserData} userLoading={userLoading} />
                </div>
                {tab === 2 && (
                  <div
                    className={`bg-white shadow-2xl border border-light-blue p-5 rounded-xl ${tab === 2 ? "block" : "hidden"
                      }`}>
                    <UserRole permissions={permissions} searchValue={searchValue} setAllUserRoleData={setAllUserRoleData} allUserRoleData={allUserRoleData} fetchUserRoleData={fetchUserRoleData} allUserData={allUserData} setAllUserData={setAllUserData} fetchUserData={fetchUserData} userLoading={userLoading} userRoleLoading={userRoleLoading} />
                  </div>
                )}
                {tab === 3 && (
                  <div
                    className={`space-y-6 bg-white shadow-2xl border border-light-blue p-5 rounded-xl ${tab === 3 ? "block" : "hidden"
                      }`}>
                    <Billing permissions={permissions} billingData={billingData} searchValue={searchValue} fetchBillingData={fetchBillingData} setBillingData={setBillingData} />
                  </div>
                )}
                {tab === 4 && (
                  <div
                    className={`space-y-6 bg-white shadow-2xl border border-light-blue p-5 rounded-xl ${tab === 4 ? "block" : "hidden"
                      }`}>
                    <Invoice  permissions={permissions} showInvoice={showInvoice} setShowInvoice={setShowInvoice} InvoiceRef={InvoiceRef} DownloadInvoice={DownloadInvoice} />
                  </div>
                )}
                {tab === 5 && (
                  <div
                    className={`space-y-6 bg-white shadow-2xl border border-light-blue p-5 rounded-xl ${tab === 5 ? "block" : "hidden"
                      }`}>
                    <MyPlan />
                  </div>
                )}
                {tab === 6 && (
                  <div className={`space-y-6 bg-white shadow-2xl border border-light-blue p-5 rounded-xl ${tab === 6 ? "block" : "hidden"
                    }`}>
                    <Discount  permissions={permissions}/>
                  </div>
                )}
                {tab === 7 && (
                  <div className={`space-y-6 bg-white shadow-2xl border border-light-blue p-5 rounded-xl ${tab === 7 ? "block" : "hidden"
                    }`}>
                    <CreateAPI />
                  </div>
                )}
                <div className={`space-y-6 bg-white shadow-2xl border border-light-blue p-5 rounded-xl ${tab === 8 ? "block" : "hidden"
                  }`}>
                  <InvoiceBilling />
                </div>
                <div className={`space-y-6 bg-white shadow-2xl border border-light-blue p-5 rounded-xl ${tab === 9 ? "block" : "hidden"
                  }`}>
                  <UserInfo />
                </div>
                <div className={`space-y-6 bg-white shadow-2xl border border-light-blue p-5 rounded-xl ${tab === 10 ? "block" : "hidden"
                  }`}>
                  <CustomerInfo />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Settings;
