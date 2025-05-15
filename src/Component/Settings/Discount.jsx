import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_DISCOUNT, GET_ALL_DISCOUNT, GET_ALL_SEGMENT, GET_DISCOUNT_BY_ID, GET_SCEDULE_TIMEZONE } from '../../Pages/API';
import axios from 'axios';
import { handleDeleteDiscount, handleGetAllDiscount, handleGetAllSegment } from '../../Redux/DiscountSlice';
import moment from 'moment';
import { MdOutlineEdit } from 'react-icons/md';
import { BiSolidDiscount } from "react-icons/bi";
import ScreenDiscount from './ScreenDiscount';
import FeatureDiscount from './FeatureDiscount';
import { pageSize } from '../Common/Common';
import AddEditDiscount from './AddEditDiscount';
import { handlegetTimeZones } from "../../Redux/CommonSlice"

const Discount = ({ sidebarOpen, permissions }) => {

    const { token } = useSelector((s) => s.root.auth);
    const dispatch = useDispatch()
    const authToken = `Bearer ${token}`;
    const [openModal, setOpenModal] = useState(false)
    const [discount, setDiscount] = useState("")
    const [allDiscount, setAllDiscount] = useState([]);
    const [selectData, setSelectData] = useState("")
    const [allSegment, setAllSegment] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Adjust items per page as needed
    const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
    const [sortedField, setSortedField] = useState(null);
    const [loading, setLoading] = useState(true)
    const [getTimezone, setTimezone] = useState([]);
    const [selectedTimezoneName, setSelectedTimezoneName] = useState();

    const totalPages = Math.ceil(allDiscount?.length / itemsPerPage);
    // Function to sort the data based on a field and order
    const sortData = (data, field, order) => {
        const sortedData = [...data];
        sortedData.sort((a, b) => {
            if (order === "asc") {
                return a[field] > b[field] ? 1 : -1;
            } else {
                return a[field] < b[field] ? 1 : -1;
            }
        });
        return sortedData;
    };

    const sortedAndPaginatedData = sortData(
        allDiscount,
        sortedField,
        sortOrder
    ).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(handlegetTimeZones({ token }))
            .then((response) => {
                setTimezone(response.data.data);
                const timezone = new Date()
                    .toLocaleDateString(undefined, {
                        day: "2-digit",
                        timeZoneName: "long",
                    })
                    .substring(4);
                setSelectedTimezoneName(timezone);
            })
            .catch((error) => {
                console.log('error', error)
            })
    }, [])

    const fetchDiscountData = () => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: GET_ALL_DISCOUNT,
            headers: {
                Authorization: authToken,
            },
        };

        dispatch(handleGetAllDiscount({ config })).then((res) => {
            if (res?.payload?.data) {
                setAllDiscount([])
                setLoading(false)
            }
        }).catch((error) => {
            console.log('error', error)
            setLoading(false)
        })
    }

    const fetchAllSegment = () => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: GET_ALL_SEGMENT,
            headers: {
                Authorization: authToken,
            },
        };

        dispatch(handleGetAllSegment({ config })).then((res) => {
            if (res?.payload?.data) {
                setAllSegment(res?.payload?.data)
            }
        }).catch((error) => {
            console.log('error', error)
        })
    }

    useEffect(() => {
        // fetchDiscountData()
        // fetchAllSegment()
        setLoading(false)
    }, [])

    const togglemodal = () => {
        setOpenModal(!openModal)
    }

    const handleEditDiscount = (id) => {
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${GET_DISCOUNT_BY_ID}?DiscountID=${id}`,
            headers: {
                Authorization: authToken,
            },
        }
        dispatch(handleDeleteDiscount({ config })).then((res) => {
            if (res?.payload?.status) {
                setDiscount(res?.payload?.data?.discountType)
                setSelectData(res?.payload?.data);
            }
        }).catch((error) => {
            console.log('error', error)
        })
    }

    const handleDelete = (ID) => {

        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${DELETE_DISCOUNT}?DiscountID=${ID}`,
            headers: {
                Authorization: authToken,
            },
        }

        // try {
        //     Swal.fire({
        //         title: "Delete Permanently",
        //         text: "Are you sure you want to delete this",
        //         icon: "warning",
        //         showCancelButton: true,
        //         confirmButtonColor: "#d33",
        //         cancelButtonColor: "#3085d6",
        //         confirmButtonText: "Yes, delete it!",
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             dispatch(handleDeleteDiscount({ config }))
        //                 .then((res) => {
        //                     if (res?.payload?.status) {
        //                         toast.success("Delete data successFully");
        //                         fetchDiscountData()
        //                     }
        //                 })
        //                 .catch((error) => {
        //                     console.log("error", error);
        //                 });
        //         }
        //     });
        // } catch (error) {
        //     console.log("error handleDeletePermanently Singal --- ", error);
        // }
    };

    return (
        <>
            {discount === "" && (
                <div className='lg:p-5 md:p-5 sm:p-2 xs:p-2'>
                    <div className="flex items-center justify-between mx-2 mb-5">
                        <h1 className="font-medium lg:text-2xl md:text-2xl sm:text-xl">
                            Discount
                        </h1>
                        <div className="flex items-center gap-2">
                            <button
                                className="flex align-middle border-primary items-center float-right border rounded-full lg:px-6 sm:px-5 py-2 text-base sm:text-sm  hover:bg-primary hover:text-white hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/50 gap-1"
                                onClick={() => setOpenModal(true)}
                            >
                                <BiSolidDiscount className="text-2xl mr-1" />
                                Add New Discount
                            </button>
                        </div>
                    </div>
                    <div className="clear-both">
                        <div className="bg-white rounded-xl lg:mt-6 md:mt-6 mt-4 shadow screen-section ">
                            <div className="rounded-xl overflow-x-scroll sc-scrollbar sm:rounded-lg">
                                <table
                                    className="screen-table w-full bg-white lg:table-auto md:table-auto sm:table-auto xs:table-auto"
                                    cellPadding={15}>
                                    <thead className="bg-blue-lighter">
                                        <tr>
                                            <th className="px-5 py-3 text-left font-semibold text-gray-900 ">
                                                Discount Type
                                            </th>
                                            <th className="px-5 py-3 text-left font-semibold text-gray-900 ">
                                                Discount Code
                                            </th>
                                            {/* <th className="px-5 py-3 text-left font-semibold text-gray-900 ">
                                            Notification
                                        </th>*/}
                                            <th className="px-5 py-3 text-left font-semibold text-gray-900 ">
                                                Start Date
                                            </th>
                                            <th className="px-5 py-3 text-left font-semibold text-gray-900 ">
                                                End Date
                                            </th>
                                            <th className="px-5 py-3 text-left font-semibold text-gray-900 ">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {loading && sortedAndPaginatedData.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                >
                                                    <div className="flex justify-center p-5">
                                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        {!loading &&
                                            allDiscount &&
                                            sortedAndPaginatedData?.length > 0 &&
                                            sortedAndPaginatedData.map((item, index) => {
                                                return (
                                                    <tr className="border-b border-gray-200 bg-white text-left" key={index}>
                                                        <td className="px-5 py-3 text-lg ">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {item?.discountType}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-3 text-lg ">
                                                            <p className="text-gray-900 whitespace-no-wrap">{item?.discountCode}</p>
                                                        </td>
                                                        <td className="px-5 py-3 text-lg ">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {moment(item?.startDate).format(
                                                                    "YYYY-MM-DD hh:mm"
                                                                )}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-3 text-lg text-center">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {item?.endDate !== null && moment(item?.endDate).format(
                                                                    "YYYY-MM-DD hh:mm"
                                                                )}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-3 text-lg text-center">
                                                            <div className="flex gap-4 justify-center items-center">
                                                                <>
                                                                    {permissions?.isSave && (
                                                                        <div
                                                                            data-tip
                                                                            data-for="Edit"
                                                                            className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xl p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                            onClick={() => {
                                                                                handleEditDiscount(item?.discountID)
                                                                            }}
                                                                        >
                                                                            <MdOutlineEdit />
                                                                        </div>
                                                                    )}

                                                                    {/* <div
                                                                    data-tip
                                                                    data-for="Delete"
                                                                    className="cursor-pointer text-white bg-rose-500 hover:bg-rode-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                    onClick={() =>
                                                                        handleDelete(item?.discountID)
                                                                    }
                                                                >
                                                                    <RiDeleteBin5Line />
                                                                </div>*/}
                                                                </>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        {!loading &&
                                            allDiscount &&
                                            sortedAndPaginatedData?.length === 0 && (
                                                <>
                                                    <tr>
                                                        <td
                                                            className="font-semibold text-center bg-white text-lg p-3"
                                                            colSpan={5}
                                                        >
                                                            No Data Available.
                                                        </td>
                                                    </tr>
                                                </>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                            {allDiscount?.length > 0 && (
                                <div className="flex my-3 items-center border float-right h-12 lg:mr-20 md:mr-16 sm:mr-8 text-gray-500 rounded-lg bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    {Array.from({ length: Math.ceil(allDiscount?.length / pageSize) }, (_, index) => (
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
                    </div>
                </div>
            )}
            {discount === "Screen" && (
                <ScreenDiscount discount={discount} setDiscount={setDiscount} fetchDiscountData={fetchDiscountData} allSegment={allSegment} selectData={selectData} getTimezone={getTimezone} setSelectedTimezoneName={setSelectedTimezoneName} selectedTimezoneName={selectedTimezoneName} />
            )}
            {discount === "Features" && (
                <FeatureDiscount discount={discount} setDiscount={setDiscount} fetchDiscountData={fetchDiscountData} allSegment={allSegment} selectData={selectData} getTimezone={getTimezone} setSelectedTimezoneName={setSelectedTimezoneName} selectedTimezoneName={selectedTimezoneName} />
            )}

            {openModal && (
                <AddEditDiscount togglemodal={togglemodal} setDiscount={setDiscount} discount={discount} />
            )}
        </>
    )
}

export default Discount
