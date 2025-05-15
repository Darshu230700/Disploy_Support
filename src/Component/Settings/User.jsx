import React, { useEffect, useRef, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import AddEditUser from '../Common/AddEditUser'
import { MdDelete, MdEdit } from 'react-icons/md';
import ConfirmationDialog from '../Common/ConfirmationDialog';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CUSTOMER_REGISTER, ADD_REGISTER_URL, baseUrl, customerURL } from '../../Pages/API';
import toast from 'react-hot-toast';
import { handleGetCountries } from '../../Redux/SettingUserSlice';
import { BiUserPlus } from "react-icons/bi";
import { debounce } from "lodash";
import ViewUserDetail from '../Common/ViewUserDetail';
import { GetRoleName, createImageFromInitials, pageSize } from '../Common/Common';

const color = "#e4aa07";
const User = ({ allUserRoleData, allUserData, setAllUserData, fetchUserData, userLoading, permissions }) => {

    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.root.auth);
    const { Countries } = useSelector((s) => s.root.settingUser);
    const authToken = `Bearer ${token}`;
    const hiddenFileInput = useRef(null);
    const [userData, setUserData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [cities, setCities] = useState([]);
    const [showDeleteModal, setDeleteShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState("");
    const [showViewModal, setShowViewModal] = useState(false)
    const [isActive, setIsActive] = useState(0);
    const [file, setFile] = useState();
    const [fileEdit, setFileEdit] = useState("");
    const [view, setView] = useState(false)
    const [heading, setHeading] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = allUserData?.SearchData?.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        dispatch(handleGetCountries());
    }, []);

    useEffect(() => {
        fetchUserData()
    }, [])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleView = (data) => {
        let URL = "";
        if (user?.loginType === "Employee") {
            URL = `${baseUrl}GetEmployeeMaster?EmployeeMasterID=${data?.employeeMasterID}`;
        } else {
            URL = `${customerURL}GetCustomerMaster?CustomerMasterID=${data?.customerMasterID}`
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
                setUserData(response?.data?.data)
                setSelectedCountry(response?.data?.data?.countryID)
                setFileEdit(response?.data?.data?.profilePic);
                setHeading("Update")
                setView(true)
                setShowViewModal(true)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const toggleModal = () => {
        if (!view) {
            setUserData()
        }
        setFile()
        setFileEdit()
        setShowModal(!showModal);
    };
    const HandleClose = () => {
        setDeleteShowModal(!showDeleteModal);
    }

    const handleEdit = (data) => {
        let URL = "";
        if (user?.loginType === "Employee") {
            URL = `${baseUrl}GetEmployeeMaster?EmployeeMasterID=${data?.employeeMasterID}`;
        }
        // else {
        //     URL = `${customerURL}GetCustomerMaster?CustomerMasterID=${data?.customerMasterID}`
        // }
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
                setUserData(response?.data?.data)
                setSelectedCountry(response?.data?.data?.countryID)
                setFileEdit(response?.data?.data?.profilePic);
                setHeading("Update")
                setShowModal(true)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const onSubmit = (data) => {
        let formdata = new FormData();
        if (file !== null && file !== undefined) {
            formdata.append("File", file);
        } else {
            formdata.append("ProfilePic", data?.profilePic ? data?.profilePic : "");
        }
        if (heading === "Add") {
            formdata.append("cityID", data?.cityID);
            formdata.append("countryID", data?.countryID);
            formdata.append("email", data?.email);
            formdata.append("name", data?.name);
            formdata.append("password", data?.password);
            formdata.append("street", data?.street);
            formdata.append("zipcode", data?.zipcode);
            formdata.append("Status", isActive);
            formdata.append("UserRoleID", data?.userRoleID)
            formdata.append("opretion", "Save");
        } else {
            formdata.append("employeeMasterID", data?.employeeMasterID);
            formdata.append("cityID", data?.cityID);
            formdata.append("countryID", data?.countryID);
            formdata.append("name", data?.name);
            formdata.append("street", data?.street);
            formdata.append("zipcode", data?.zipcode);
            formdata.append("Status", isActive);
            formdata.append("UserRoleID", data?.userRoleID)
            formdata.append("opretion", "Save");
        }

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: user?.loginType === "Employee" ? ADD_REGISTER_URL : ADD_CUSTOMER_REGISTER,
            headers: {
                "Content-Type": "multipart/formdata"
            },
            data: formdata,
        };
        axios.request(config)
            .then((response) => {
                if (response?.data?.status) {
                    toast.success(response?.data?.message)
                    fetchUserData()
                    setShowModal(false)
                } else {
                    toast.error(response?.data?.message);
                }
                setFile()
                if (view) {
                    setUserData(response?.data?.data)
                } else {
                    setUserData()
                }
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
            setAllUserData({ ...allUserData, SearchData: allUserData?.userData })
        } else {
            const filterData = allUserData?.userData?.filter((item) => item?.name?.toLowerCase().includes(searchQuery))
            setAllUserData({ ...allUserData, SearchData: filterData })
            setCurrentPage(1)
        }
    }

    const debouncedOnChange = debounce(handleChange, 500);

    const handleDelete = () => {
        let URL = "";
        if (user?.loginType === "Employee") {
            URL = `${baseUrl}DeleteEmployee?EmployeeMasterIDs=${selectedData?.employeeMasterID}`;
        }
        // else {
        //     URL = `${customerURL}DeleteCustomer?CustomerMasterIDs=${selectedData?.customerMasterID}`
        // }
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: URL,
            headers: {
                Authorization: authToken,
            },
        };
        axios.request(config)
            .then((response) => {
                toast.success(response?.data?.message)
                fetchUserData()
                setDeleteShowModal(false);
            })
            .catch((error) => {
                toast.remove()
                console.log(error);
            });
    }

    const handleClick = (e) => {
        hiddenFileInput.current.click();
    };

    const handleFileChange = (e) => {
        setFileEdit();
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };
    return (
        <>{
            !showViewModal ? (
                <>
                    <div className="flex items-center lg:flex-row md:flex-row sm:flex-col flex-col justify-between mx-2 mb-5">
                        <div className="title">
                            <h2 className="font-bold text-xl">User List</h2>
                        </div>
                        <div className="flex items-center gap-2 lg:flex-row md:flex-row sm:flex-col flex-col">
                            <div className="bg-white dark:bg-gray-900">
                                <div className="relative mt-1">
                                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-black rounded-full w-56 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" onChange={(e) => debouncedOnChange(e)} />
                                </div>
                            </div>
                            {permissions?.isSave && (
                                <button
                                    className="flex align-middle border-primary items-center float-right border rounded-full lg:px-6 sm:px-5 py-2 text-base sm:text-sm  hover:bg-primary hover:text-white hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/50"
                                    onClick={() => { setShowModal(true); setHeading("Add"); setFile(); setIsActive(0) }}
                                >
                                    <BiUserPlus className="text-2xl mr-1" />
                                    Add New Users
                                </button>
                            )}

                        </div>
                    </div>
                    <div className="inline-block min-w-full max-w-full shadow-md rounded-lg overflow-x-auto ">
                        <table className="min-w-full leading-normal">
                            <thead className="bg-blue-lighter">
                                <tr>
                                    <th className="px-5 py-3 text-left font-semibold text-gray-900 ">
                                        User Name
                                    </th>
                                    <th className="px-5 py-3 text-left font-semibold text-gray-900 ">
                                        Roles
                                    </th>
                                    {/* <th className="px-5 py-3 text-left font-semibold text-gray-900 ">
                                        Notification
                                    </th>*/}
                                    <th className="px-5 py-3 text-left font-semibold text-gray-900 ">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 text-left font-semibold text-gray-900 ">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {userLoading && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                        >
                                            <div className="flex justify-center p-5">
                                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {currentItems?.length > 0 && !userLoading && (
                                    currentItems?.map((item, index) => {
                                        return (
                                            <tr className="border-b border-gray-200 bg-white" key={index}>
                                                <td className="p-3 text-lg">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            {item?.profilePic ? (
                                                                <img
                                                                    className="w-full h-full rounded-full"
                                                                    src={
                                                                        item?.profilePic
                                                                    }
                                                                />
                                                            ) : (
                                                                <img
                                                                    className="w-full h-full rounded-full"
                                                                    src={
                                                                        createImageFromInitials(
                                                                            500,
                                                                            item?.name,
                                                                            color
                                                                        )}
                                                                    alt=""
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 text-base whitespace-no-wrap">
                                                                {item?.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-3 text-lg">
                                                    <p className="text-gray-900 text-base whitespace-no-wrap">
                                                        {item?.userRoleName}
                                                    </p>
                                                </td>
                                                {/*<td className="p-3 text-lg">
                                                    <select className=" w-full border text-base border-[#D5E3FF] rounded-xl p-2 drop-shadow-sm">
                                                        <option value="1">Email</option>
                                                        <option value="2">Phone</option>
                                                    </select>
                                                                        </td>*/}

                                                <td className="p-3 text-lg">
                                                    {item?.status === "1" && (
                                                        <span className="bg-green-200 rounded-lg px-3 py-1 font-semibold text-green-900 leading-tight">
                                                            Active
                                                        </span>
                                                    )}
                                                    {item?.status === "0" && (
                                                        <span className="px-3 py-1 rounded-lg font-semibold bg-grey-light text-grey-400 leading-tight">
                                                            Inactive
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-3 text-lg flex items-center">
                                                    {permissions?.isView && (
                                                        <button
                                                            type="button"
                                                            className="inline-block text-base bg-blue-300 text-blue hover:text-white rounded-full p-2 w-10 h-10 mr-2"
                                                            onClick={() => { handleView(item) }}>
                                                            <div className="flex justify-center">
                                                                <FaEye className='text-base' />
                                                            </div>
                                                        </button>
                                                    )}
                                                    {permissions?.isSave && (
                                                        <button
                                                            type="button"
                                                            className="inline-block text-base bg-grey-light text-gray-900 hover:text-gray-700 rounded-full p-2 mr-2 w-10 h-10" onClick={() => handleEdit(item)}>
                                                            <div className="flex justify-center">
                                                                <MdEdit className='text-base' />
                                                            </div>
                                                        </button>
                                                    )}
                                                    {permissions?.isDelete && (
                                                        <button
                                                            type="button"
                                                            className="inline-block text-base bg-red-200 text-red-600 hover:text-white rounded-full p-2 w-10 h-10"
                                                            onClick={() => { setDeleteShowModal(true); setSelectedData(item) }}>
                                                            <div className="flex justify-center">
                                                                <MdDelete className='text-base' />
                                                            </div>
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                                {currentItems?.length === 0 && !userLoading && (
                                    <tr>
                                        <td
                                            className="font-semibold text-center bg-white text-lg p-3"
                                            colSpan={6}
                                        >
                                            No Data Available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {/* Pagination */}
                        {allUserData?.SearchData?.length > 0 && (
                            <div className="flex my-3 items-center border float-right h-12 lg:mr-20 md:mr-16 sm:mr-8 text-gray-500 rounded-lg bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                {Array.from({ length: Math.ceil(allUserData?.SearchData?.length / pageSize) }, (_, index) => (
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
                    </div >
                </>
            ) : (
                <ViewUserDetail setShowViewModal={setShowViewModal} userData={userData} setUserData={setUserData} showModal={showModal} setShowModal={setShowModal} setView={setView} allUserRoleData={allUserRoleData} />
            )
        }
            {showModal && (
                <AddEditUser
                    toggleModal={toggleModal}
                    userData={userData}
                    onSubmit={onSubmit}
                    Countries={Countries}
                    setSelectedCountry={setSelectedCountry}
                    selectedCountry={selectedCountry}
                    setCities={setCities}
                    cities={cities}
                    heading={heading}
                    setIsActive={setIsActive}
                    isActive={isActive}
                    handleClick={handleClick}
                    hiddenFileInput={hiddenFileInput}
                    handleFileChange={handleFileChange}
                    file={file}
                    fileEdit={fileEdit}
                    allUserRoleData={allUserRoleData}
                />
            )
            }
            {
                showDeleteModal && (
                    <ConfirmationDialog
                        HandleClose={HandleClose}
                        handleDelete={handleDelete}
                    />
                )
            }
        </>
    )
}

export default User
