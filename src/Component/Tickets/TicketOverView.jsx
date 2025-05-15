import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import TicketIsuue_Icon from "../../Images/Ticket/ticket-issue-icon.svg"
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ADDUPDATE_USERROLE, ADD_EDIT_TICKET, GET_ALL_TICKET, SAVETICKET, SOLUTION_CHECKLIST, baseUrl } from '../../Pages/API';
import axios from 'axios';
import { TicketStatus, formatDate, transformArray } from '../Common/Common';
import AssignTicket from './AssignTicket';
import { IoChevronBack } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { debounce } from 'lodash';
const TicketOverView = ({ sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar }) => {
    TicketOverView.propTypes = {
        sidebarOpen: PropTypes.bool.isRequired,
        setSidebarOpen: PropTypes.func.isRequired,
        mobileSidebar: PropTypes.bool.isRequired,
        setMobileSidebar: PropTypes.func.isRequired,
    };
    const { id } = useParams();
    const { user, token } = useSelector((state) => state.root.auth);
   
    const authToken = `Bearer ${token}`;
    const navigation = useNavigate()
    const [selectedData, setSelectedData] = useState("");
    const [assignRole, setAssignRole] = useState("");
    const [ticketStatus, setTicketStatus] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [allUserRoleData, setAllUserRoleData] = useState({
        userRoleData: [],
        SearchData: []
    })
    const [allUserData, setAllUserData] = useState({
        userData: [],
        SearchData: []
    });
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [checkList, setCheckList] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = () => {
        setLoading(true)
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${GET_ALL_TICKET}?TicketMasterID=${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        };
        axios.request(config)
            .then((response) => {
                setSelectedData(response?.data?.data)
                setTicketStatus(response?.data?.data?.status);
                const selectedcheckList = response?.data?.data?.lstSolutionChecklists?.map(item => item?.solutionChecklistsID) || [];
                setSelectedCheckboxes(selectedcheckList)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)

            });
    }

    const fetchUserRoleData = () => {
        setLoading(true)
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
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    }

    const fetchUserData = () => {
        setLoading(true)
        let URL = `${baseUrl}GetEmployeeMaster`;
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
                    SearchData: response?.data?.data,
                })
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    }

    const fetchSolutionChecklist = () => {
        setLoading(true)
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: SOLUTION_CHECKLIST,
            headers: {
                Authorization: authToken,
            },
        };
        axios.request(config)
            .then((response) => {
                setCheckList(response?.data?.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    }
    useEffect(() => {
        fetchData()
        fetchUserData()
        fetchSolutionChecklist()
        fetchUserRoleData()
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        if (allUserData?.SearchData?.length > 0) {
            const filteredRole = allUserData?.SearchData?.filter((item) => item?.employeeMasterID === selectedData?.assignedToID)
            const selectedRole = filteredRole.find((item) => item);
            setAssignRole(selectedRole)
        }
        // eslint-disable-next-line
    }, [allUserRoleData, selectedData])

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const onsubmit = () => {
        const commonParams = {
            "ticketNumber": "string",
            "phoneNumber": selectedData?.phoneNumber,
            "clientName": selectedData?.clientName,
            "callerName": selectedData?.callerName,
            "ticketCreatedDate": selectedData?.ticketCreatedDate,
            "status": selectedData?.status,
            "location": selectedData?.location,
            "issueID": selectedData?.issueID,
            "issueName": selectedData?.issueName ? selectedData?.issueName : "string",
            "createdBy": 0,
            "createdDate": "2024-01-10T07:23:14.809Z",
            "updatedBy": 0,
            "updatedDate": 0,
            "flagdeleted": false,
            "AssignedToID": selectedUser?.employeeMasterID,
        };

        const specificParams = {
            "ticketMasterID": selectedData?.ticketMasterID,
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
                toast.success("Ticket Assigned Successfully.")
                fetchData()
                setShowModal(false)
            })
            .catch((error) => {
                console.log(error);
                setShowModal(false)
                toast.remove()
            });
    }

    const handleSave = () => {
        const Params = transformArray(selectedCheckboxes)
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${SAVETICKET}?Status=${ticketStatus}&TicketMasterID=${selectedData?.ticketMasterID}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
            data: JSON.stringify(Params)
        };
        axios.request(config)
            .then((response) => {
                toast.success(response?.data?.message)
                navigation('/tickets')
                fetchData()
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const handleCheckboxChange = (index) => {
        setSelectedCheckboxes((prevSelected) => {
            if (prevSelected.includes(index)) {
                return prevSelected.filter((item) => item !== index);
            } else {
                return [...prevSelected, index];
            }
        });
    };

    const handleChange = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        if (searchQuery === "") {
            setAllUserData({ ...allUserData, SearchData: allUserData?.userData })
        } else {
            const filterData = allUserData?.userData?.filter((item) => item?.name?.toLowerCase().includes(searchQuery))
            setAllUserData({ ...allUserData, SearchData: filterData })
        }
    }

    const debouncedOnChange = debounce(handleChange, 500);

    return (
        <>
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
            <div className="flex flex-1">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
                {loading && (
                    <div className='w-full flex justify-center'>
                        <div className="flex items-center justify-center w-full h-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                )}
                {!loading && (
                    <main className="bg-white flex-1 p-3 overflow-hidden">
                        <div className="flex flex-col">
                            <section className="flex items-center justify-between mx-2 mb-5">
                                <div className="title">
                                    <h2
                                        className="font-bold text-xl flex items-center gap-2 cursor-pointer"
                                        onClick={() => navigation("/tickets")} >
                                        <IoChevronBack />
                                        Ticket overview
                                    </h2>
                                </div>
                            </section>
                            <section className="w-full p-3">
                                <div className="flex flex-wrap -mx-3">
                                    <div className="w-full md:w-2/3 px-3 mb-3">
                                        <div className="bg-side-nav shadow-xl rounded-xl">
                                            <div className="flex items-center justify-between p-5">
                                                <div className="flex items-center">
                                                    <div className="bg-gray-400 rounded-xl p-3"><img src={TicketIsuue_Icon} alt="Logo" className="cursor-pointer h-12 w-12" /></div>
                                                    <div className="ml-3">
                                                        <h4 className="text-lg font-medium mb-3">{selectedData?.ticketNumber} - Screen isn't changing the media?</h4>
                                                        <h4 className="text-sm font-normal flex items-center gap-2">Create Date :{formatDate(selectedData?.ticketCreatedDate)}
                                                            {selectedData?.status === "ReOpen" && (
                                                                <span className="relative inline-block px-3 py-1 font-semibold bg-green-200 text-green-800 leading-tight rounded-full">
                                                                    {selectedData?.status}
                                                                </span>
                                                            )}
                                                            {selectedData?.status === "Pending" && (
                                                                <span className="relative inline-block px-3 py-1 font-semibold bg-orange-200 text-orange-400 leading-tight rounded-full">
                                                                    {selectedData?.status}
                                                                </span>
                                                            )}
                                                            {selectedData?.status === "Close" && (
                                                                <span className="relative inline-block px-3 py-1 font-semibold bg-red-200 text-red-600 leading-tight rounded-full">
                                                                    {selectedData?.status}
                                                                </span>
                                                            )}
                                                            {selectedData?.status === "Assigned" && (
                                                                <span className="relative inline-block px-3 py-1 font-semibold bg-blue-300 text-blue leading-tight rounded-full">
                                                                    {selectedData?.status}
                                                                </span>
                                                            )}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <button className="bg-black text-white px-5 py-2 rounded-full" onClick={() => handleSave()}>Save</button>
                                            </div>
                                            <div className="px-5">
                                                <h3 className="font-semibold text-xl mb-5">Solution Checklists</h3>
                                                {checkList?.map((item, index) => {
                                                    return (
                                                        <div className="checklists p-3 shadow-sm border border-gray-400 bg-white rounded-xl" key={item?.solutionChecklistsID}>
                                                            <input
                                                                type="checkbox"
                                                                id={`Solution${item?.solutionChecklistsID}`}
                                                                checked={selectedCheckboxes.includes(item?.solutionChecklistsID)}
                                                                onChange={() => handleCheckboxChange(item?.solutionChecklistsID)}
                                                            />
                                                            <label htmlFor={`Solution${item?.solutionChecklistsID}`} className="text-base font-medium text-gray-600">{item?.message}</label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="w-full flex h-px bg-gray-400"></div>
                                            {/*<div className="flex p-5">
                                                <img src="dist/images/1user-img.png" alt="Logo" className="cursor-pointer rounded-full h-20 w-20" />
                                                <div className="ml-3">
                                                    <h4 className="text-xl mt-3"><strong>Titus Kitamura</strong> <span>12/07/2023, 05:30PM</span></h4>
                                                    <h4 className="text-lg font-normal my-2">Internal Communications</h4>
                                                    <button className="bg-blue-400 text-black px-5 py-2 rounded-lg text-lg"><i className="fav4 fa-reply " aria-hidden="true"></i> Reply</button>
                                                </div>
                                            </div>
                                            <div className="px-5 w-full pb-5">
                                                <textarea rows="3" className="border border-gray-400 p-2 rounded-lg w-full" placeholder="Write something..."></textarea>
                                                <div className="flex items-center justify-end mt-4">
                                                    <button className="px-5 py-3 bg-blue hover:bg-white border border-blue hover:text-blue text-white rounded-full text-lg">Post Comments</button>
                                                </div>
                                            </div>*/}

                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3 px-3 mb-6">
                                        <div className="bg-side-nav shadow-xl rounded-xl p-5">
                                            <h4 className="text-lg font-medium mb-3">Ticket Details</h4>
                                            <div className="user-pro-details">
                                                <div className="flex items-center">
                                                    <label>Ticket ID No:</label><span>{selectedData?.ticketNumber}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <label>Client:</label><span>{selectedData?.clientName}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <label>Phone:</label><span>{selectedData?.phoneNumber}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <label>Location:</label><span>{selectedData?.location}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <label>Assigned To:</label>
                                                    {selectedData?.assignedToID === null ? (
                                                        <button className="bg-blue text-white w-10 h-10 flex items-center justify-center text-lg rounded-full cursor-pointer" onClick={() => setShowModal(true)}>+</button>
                                                    ) : (
                                                        <span>{assignRole?.name}</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center">
                                                    <label>Caller Name:</label><span>{selectedData?.callerName}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <label>Status:</label>
                                                    <span>
                                                        <select id="ticketStatus" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 cursor-pointer"
                                                            placeholder="Select Status"
                                                            value={ticketStatus}
                                                            onChange={(e) => {
                                                                setTicketStatus(e.target.value)
                                                            }}>
                                                            {TicketStatus.map((ticket) => (
                                                                <option
                                                                    key={ticket.statusid}
                                                                    value={ticket.Status}
                                                                >
                                                                    {ticket.Status}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <label>Create Date:</label><span>{formatDate(selectedData?.ticketCreatedDate)}</span>
                                                </div>
                                                {/* <div className="flex items-center">
                                                    <label>Closed Date:</label><span>dd/mm/yyyy</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <label>Closed By:</label><span>Closer Name</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <label>Last Activity:</label><span>14 min ago</span>
                                                </div>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>


                        </div>
                    </main>
                )}
            </div>
            {showModal && (
                <AssignTicket toggleModal={toggleModal} onsubmit={onsubmit} setSelectedUser={setSelectedUser} allUserRoleData={allUserRoleData} selectedUser={selectedUser} allUserData={allUserData} debouncedOnChange={debouncedOnChange} />
            )}
        </>
    )
}

export default TicketOverView
