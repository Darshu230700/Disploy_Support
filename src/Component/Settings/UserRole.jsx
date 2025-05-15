import React, { useState, useEffect } from 'react'
import AddEditUserRoles from '../Common/AddEditUserRoles'
import { MdDelete, MdEdit } from 'react-icons/md';
import axios from 'axios';
import { ADDUPDATE_USERROLE } from "../../Pages/API";
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationDialog from '../Common/ConfirmationDialog';
import toast from 'react-hot-toast';
import { GetRoleName, combineUserroleObjects, createImageFromInitials, pageSize } from '../Common/Common';
import { getOrgUsersRole, getUserRoleData, getUsersRoles, handleUserRoleById } from '../../Redux/SettingUserSlice';
const color = "#e4aa07";

const UserRole = ({ searchValue, setAllUserRoleData, allUserRoleData, fetchUserRoleData, fetchUserData, allUserData, setAllUserData, userRoleLoading, userLoading, permissions }) => {
    const { token } = useSelector((state) => state.root.auth);
    const authToken = `Bearer ${token}`;
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const [heading, setHeading] = useState("")
    const [selectedData, setSelectedData] = useState("");
    const [userRoleData, setUserRoleData] = useState();
    const [showDeleteModal, setDeleteShowModal] = useState(false);
    const [nextbutton, setNextButton] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = allUserRoleData?.SearchData?.slice(indexOfFirstItem, indexOfLastItem);
    const [moduleTitle, setModuleTitle] = useState([]);
    const [userDisable, setUserDisable] = useState();
    const [loading, setLoading] = useState(false);
    const [roleuserList, setRoleUserList] = useState([]);

    useEffect(() => {
        Promise.all([dispatch(getOrgUsersRole()), dispatch(getUserRoleData())])
            .then(([orgUsersRoleRes, userRoleDataRes]) => {

                // Process orgUsersRoleRes
                const filteredOrgUsersRoleData = orgUsersRoleRes.payload.data.filter(
                    (item) => item.moduleID !== 22
                    // (item) => item.moduleID !== 9 && item.moduleID !== 22
                );

                setModuleTitle(filteredOrgUsersRoleData);

                // Process userRoleDataRes
                setRoleUserList(userRoleDataRes?.payload?.data);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }, []);

    useEffect(() => {
        fetchUserRoleData()
        fetchUserData()
    }, [])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (searchValue) {
            const searchQuery = searchValue.toLowerCase();
            if (searchQuery === "") {
                setAllUserRoleData({ ...allUserRoleData, SearchData: allUserRoleData?.userRoleData })
            } else {
                const filterData = allUserRoleData?.userRoleData?.filter((item) => item?.userRole?.toLowerCase().includes(searchQuery))
                setAllUserRoleData({ ...allUserRoleData, SearchData: filterData })
                setCurrentPage(1)
            }
        } else {
            setAllUserRoleData({ ...allUserRoleData, SearchData: allUserRoleData?.userRoleData })
        }
    }, [searchValue])


    const toggleModal = () => {
        setShowModal(!showModal);
        setUserDisable();
        setUserRoleData();
    };


    const fetchUserRole = () => {
        const payload = {
            mode: "Selectlist",
        };
        setLoading(true);
        dispatch(getUsersRoles(payload))
            .then((res) => {
                setAllUserRoleData({
                    userRoleData: res?.payload?.data,
                    SearchData: res?.payload?.data,
                });
                setLoading(false);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    useEffect(() => {
        fetchUserRole();
    }, []);

    const handleSelectByID = (user_role_id) => {
        let data = JSON.stringify({
            UsersRoleID: user_role_id,
            mode: "SelectByID",
        });
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${ADDUPDATE_USERROLE}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: authToken,
            },
            data: data,
        };

        dispatch(handleUserRoleById({ config }))
            .then((res) => {
       
                if (res?.payload?.status) {
                    const selectedRole = res?.payload?.data;
                    const data = combineUserroleObjects(selectedRole);
                    // console.log('data :>> ', data);
                    setNextButton(false);
                    setUserRoleData(data);
                    setShowModal(true);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const HandleClose = () => {
        setDeleteShowModal(!showDeleteModal);
    }

    const handleDelete = () => {
        let Params = JSON.stringify({
            "usersRoleID": selectedData?.usersRoleID,
            "mode": "Delete"
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: ADDUPDATE_USERROLE,
            headers: {
                Authorization: authToken,
                'Content-Type': 'application/json',
            },
            data: Params
        };
        axios.request(config)
            .then((response) => {
                toast.success(response?.data?.message)
                fetchUserRoleData()
                fetchUserData()
                setDeleteShowModal(false);
            })
            .catch((error) => {
                toast.remove()
                console.log(error);
            });
    }

    return (
        <>
            <div className="flex items-center justify-between mx-2 mb-5">
                <div className="title">
                    <h2 className="font-bold text-xl">User Roles</h2>
                </div>
                <div className="flex items-center">
                    {permissions?.isSave && (
                        <button className="flex align-middle border-primary items-center float-right border rounded-full lg:px-6 sm:px-5 py-2 text-base sm:text-sm  hover:bg-primary hover:text-white hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/50"
                            onClick={() => {
                                setShowModal(true);
                                setHeading("Add")
                                setUserRoleData()
                                setNextButton(false)
                            }}>
                            Add New Role
                        </button>
                    )}
                </div>
            </div>

            <div className="inline-block min-w-full shadow-md rounded-lg overflow-auto ">
                <table className="min-w-full leading-normal">
                    <thead className="bg-blue-lighter">
                        <tr>
                            <th className="px-5 py-3 text-left font-semibold text-gray-900 ">
                                User Role Name
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-900 ">
                                User Count
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
                                    colSpan={4}
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
                                                <div className="ml-3">
                                                    <p className="text-gray-900 text-base whitespace-no-wrap">
                                                        {item?.userRole}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 text-lg">
                                            <p className="text-gray-900 text-base whitespace-no-wrap">
                                                {item?.userCount}
                                            </p>
                                        </td>

                                        <td className="p-3 text-lg">
                                            {permissions?.isSave && (
                                                <button
                                                    type="button"
                                                    className="inline-block text-base bg-grey-light text-gray-900 hover:text-gray-700 rounded-full p-2 mr-2 w-10 h-10"
                                                    onClick={() => {
                                                        setHeading("Update")
                                                        handleSelectByID(item.usersRoleID);
                                                    }}>
                                                    <div className="flex justify-center">
                                                        <MdEdit className='text-base' />
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
                                    colSpan={4}
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
            </div>
            {showModal && (
                <AddEditUserRoles
                    heading={heading}
                    toggleModal={toggleModal}
                    moduleTitle={moduleTitle}
                    allUserRoleData={allUserRoleData}
                    setNextButton={setNextButton}
                    nextbutton={nextbutton}
                    roleuserList={roleuserList}
                    fetchUserRole={fetchUserRole}
                    userRoleData={userRoleData}
                    setShowModal={setShowModal}
                    authToken={authToken}
                    setUserDisable={setUserDisable}
                    userDisable={userDisable}
                    setUserRoleData={setUserRoleData}
                    dispatch={dispatch}
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
    )
}

export default UserRole
