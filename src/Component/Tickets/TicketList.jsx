import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import AddEditTicket from "../Common/AddEditTicket";
import { useNavigate } from "react-router-dom";
import { GoPlusCircle } from "react-icons/go";
import ConfirmationDialog from "../Common/ConfirmationDialog";
import axios from "axios";
import toast from 'react-hot-toast';
import { EditformatDate, TicketIssue, TicketStatus, formatDate, pageSize } from "../Common/Common";
import { debounce } from "lodash";
import { ADD_EDIT_TICKET, GET_ALL_TICKET } from "../../Pages/API";
import { useSelector } from "react-redux";

const TicketList = ({ loading, allTicketData, fetchData, authToken, setAllTicketData, issueList, permissions }) => {
  const { user } = useSelector((state) => state.root.auth);
  const navigation = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [ticketData, setTicketData] = useState("");
  const [heading, setHeading] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = allTicketData?.SearchData?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const HandleClose = () => {
    setDeleteShowModal(!showDeleteModal);
  }

  const handleDelete = () => {
    setDeleteShowModal(false);
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };


  const onSubmit = (data) => {
    const commonParams = {
      "ticketNumber": "string",
      "phoneNumber": data?.phoneNumber,
      "clientName": data?.clientName,
      "callerName": data?.callerName,
      "ticketCreatedDate": data?.createDate,
      "status": heading === "Add" ? "Pending" : data?.ticketStatus,
      "location": data?.location,
      "issueID": data?.IssueID === 9 ? 0 : data?.IssueID,
      "issueName": data?.IssueID === 9 ? data?.custom : "string",
      "createdBy": 0,
      "createdDate": "2024-01-10T07:23:14.809Z",
      "updatedBy": 0,
      "updatedDate": 0,
      "flagdeleted": false,
      "AssignedToID": null,
    };

    const specificParams = {
      "ticketMasterID": heading === "Add" ? 0 : selectedData?.ticketMasterID,
    };
    const Params = JSON.stringify({ ...commonParams, ...specificParams });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: user?.loginType === "Employee" ? ADD_EDIT_TICKET : "",
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      data: Params,
    };
    axios.request(config)
      .then((response) => {
        toast.success(response?.data?.message)
        fetchData()
        setShowModal(false)
      })
      .catch((error) => {
        console.log(error);
        setShowModal(false)
        toast.remove()
      });
  }

  const handleChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    if (searchQuery === "") {
      setAllTicketData({ ...allTicketData, SearchData: allTicketData?.ticketData })
    } else {
      const filterData = allTicketData?.ticketData?.filter((item) => item?.ticketNumber?.toLowerCase().includes(searchQuery))
      setAllTicketData({ ...allTicketData, SearchData: filterData })
      setCurrentPage(1)
    }
  }

  const debouncedOnChange = debounce(handleChange, 500);

  const handleView = (data) => {
    navigation(`/ticketOverView/${data?.ticketMasterID}`)
  }

  const handleEdit = (data) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${GET_ALL_TICKET}?TicketMasterID=${data?.ticketMasterID}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    };
    axios.request(config)
      .then((response) => {
        const allData = response?.data?.data;
        let obj = {
          phoneNumber: allData?.phoneNumber,
          clientName: allData?.clientName,
          callerName: allData?.callerName,
          createDate: EditformatDate(allData?.ticketCreatedDate),
          ticketStatus: allData?.status,
          location: allData?.location,
          IssueID: allData?.issueID > 9 ? 9 : allData?.issueID,
          custom: allData?.issueID >= 9 ? allData?.issueName : ""
        }
        setTicketData(obj)
        setSelectedData(allData)
        setShowModal(true)
        setHeading("Update")
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="flex md:flex-row sm:flex-col lg:flex-row flex-col items-center justify-between mx-2 mb-5">
        <div className="title">
          <h2 className="font-bold text-xl">Tickets List</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="table-search" className={`block p-2 ps-10 text-sm text-gray-900 border border-black rounded-full w-56 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${currentItems?.length === 0 ? "cursor-no-drop" : ""}`} placeholder="Search by ticket id"
              onChange={(e) => debouncedOnChange(e)} />
          </div>
          {permissions?.isSave && (
            <button
              className="flex align-middle gap-1 border-primary items-center float-right border rounded-full lg:px-6 sm:px-5 py-2 text-base sm:text-sm  hover:bg-primary hover:text-white hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/50"
              onClick={() => {
                setShowModal(true);
                setHeading("Add")
                setTicketData()
              }}
            >
              <GoPlusCircle className="text-2xl mr-1" />
              Add Ticket
            </button>
          )}
        </div>
      </div>

      <div className="inline-block min-w-full shadow-md rounded-lg mx-2 overflow-auto ">
        <table className="min-w-full leading-normal">
          <thead className="bg-blue-lighter">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-900 ">
                Ticket ID
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-900 ">
                Client Name
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-900 ">
                Phone Number
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-900 ">
                Caller Name
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-900 ">
                Create Date
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-900 ">
                Location
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-900 ">
                Status{" "}
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-900 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={8}
                >
                  <div className="flex justify-center p-5">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
            )}
            {currentItems?.length > 0 && !loading && currentItems?.map((item) => {
              return (
                <tr className="border-b border-gray-200 bg-white" key={item?.ticketMasterID}>
                  <td className="px-5 py-3 text-sm">
                    <div className="md:w-2/3 flex ">
                      <div className="text-blue cursor-pointer" onClick={() => handleView(item)}>
                        {item?.ticketNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{item?.clientName}</p>
                  </td>
                  <td className="px-5 py-3 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item?.phoneNumber}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item?.callerName}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{formatDate(item?.ticketCreatedDate)}</p>
                  </td>
                  <td className="w-40 px-5 py-3 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item?.location}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-sm">
                    {item?.status === "ReOpen" && (
                      <span className="relative inline-block px-3 py-1 font-semibold bg-green-200 text-green-800 leading-tight rounded-full">
                        {item?.status}
                      </span>
                    )}
                    {item?.status === "Pending" && (
                      <span className="relative inline-block px-3 py-1 font-semibold bg-orange-200 text-orange-400 leading-tight rounded-full">
                        {item?.status}
                      </span>
                    )}
                    {item?.status === "Close" && (
                      <span className="relative inline-block px-3 py-1 font-semibold bg-red-200 text-red-600 leading-tight rounded-full">
                        {item?.status}
                      </span>
                    )}
                    {item?.status === "Assigned" && (
                      <span className="relative inline-block px-3 py-1 font-semibold bg-blue-300 text-blue leading-tight rounded-full">
                        {item?.status}
                      </span>
                    )}

                  </td>
                  <td className="px-5 py-3 text-sm flex items-center">
                    {permissions?.isView && (
                      <div>
                        <button
                          type="button"
                          className="inline-block bg-blue-300 text-blue hover:text-white rounded-full p-2 w-8 h-8" onClick={() => handleView(item)}>
                          <div className="flex justify-center">
                            <FaEye />
                          </div>
                        </button>
                      </div>
                    )}
                    {permissions?.isSave && (
                      <button
                        type="button"
                        className="inline-block bg-grey-light text-gray-900 hover:text-gray-700 rounded-full p-2 mx-2 w-8 h-8"
                        onClick={() => {
                          handleEdit(item)
                        }}
                      >
                        <div className="flex justify-center">
                          <MdEdit />
                        </div>
                      </button>
                    )}
                    {/* {permissions?.isDelete && (
                      <button
                        type="button"
                        className="inline-block bg-red-lighter text-red-600 hover:text-white rounded-full p-2 w-8 h-8"
                        onClick={() => { setDeleteShowModal(true); setSelectedData(item) }}>
                        <div className="flex justify-center">
                          <MdDelete />
                        </div>
                      </button>
                    )} */}
                    
                  </td>
                </tr>
              )
            })}
            {currentItems?.length === 0 && !loading && (
              <tr>
                <td
                  className="font-semibold text-center bg-white text-lg p-3"
                  colSpan={8}
                >
                  No Data Available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
        {allTicketData?.SearchData?.length > 0 && (
          <div className="flex my-3 items-center border float-right h-12 lg:mr-20 md:mr-16 sm:mr-8 text-gray-500 rounded-lg bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {Array.from({ length: Math.ceil(allTicketData?.SearchData?.length / pageSize) }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`rounded-lg w-full h-full border-r p-3 rtl:rotate-180 pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

      </div>
      {showModal && (
        <AddEditTicket
          toggleModal={toggleModal}
          TicketStatus={TicketStatus}
          TicketIssue={TicketIssue}
          heading={heading}
          onSubmit={onSubmit}
          issueList={issueList}
          ticketData={ticketData}
        />
      )}
      {
        showDeleteModal && (
          <ConfirmationDialog
            HandleClose={HandleClose}
            handleDelete={handleDelete}
          />
        )
      }
    </>
  );
};

export default TicketList;
