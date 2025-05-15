import React, { useEffect, useState } from 'react'
import { FaDownload, FaEye } from 'react-icons/fa'
import InvoiceBilling from './InvoiceBilling'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALL_INVOICE, GET_INVOICE_BY_ID } from '../../Pages/API'
import { handleAllInvoice, handleInvoiceById } from '../../Redux/InvoiceSlice'
import { mockComponent } from 'react-dom/test-utils'
import { BsEyeFill } from 'react-icons/bs'
import { pageSize } from '../Common/Common'
import { IoIosArrowRoundBack } from 'react-icons/io'
const Invoice = ({ showInvoice, setShowInvoice, InvoiceRef, DownloadInvoice, permissions }) => {

    const dispatch = useDispatch()
    const { user, token } = useSelector((s) => s.root.auth);
    const authToken = `Bearer ${token}`;
    const [invoiceData, setInvoiceData] = useState([]);
    const [selectData, setSelectData] = useState(null)
    const [selectInvoiceId, setInvoiceId] = useState("")
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = invoiceData?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(invoiceData?.length / itemsPerPage);

    const fetchAllInvoice = () => {
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${GET_ALL_INVOICE}?Email=${user?.role === "1" ? "" : user?.emailID}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: authToken
            },
        }
        dispatch(handleAllInvoice({ config })).then((res) => {
            setInvoiceData([])
            setLoading(false)
        })
    }

    const fetchInvoiceById = () => {
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${GET_INVOICE_BY_ID}?invoiceNumber=${selectInvoiceId}&Role=${user?.role === "1" ? "S" : "User"}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: authToken
            },
        }
        dispatch(handleInvoiceById({ config })).then((res) => {
            setSelectData(res?.payload?.data)
        })
    }

    useEffect(() => {
        // fetchAllInvoice()
        setLoading(false)

    }, [])

    useEffect(() => {
        if (selectInvoiceId) {
            fetchInvoiceById()
        }
    }, [selectInvoiceId])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <>{!showInvoice && (
            <>
                <div className="flex items-center justify-between mx-2 mb-5">
                    <div className="title">
                        <h2 className="font-bold text-xl">Invoice</h2>
                    </div>
                </div>
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-auto ">
                    <table className="min-w-full leading-normal">
                        <thead className="bg-blue-lighter">
                            <tr>
                                <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                    ID
                                </th>
                                <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                    Client Name
                                </th>
                                <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                    Total
                                </th>
                                <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                    Issued Date
                                </th>
                                <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                    Status{" "}
                                </th>
                                <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && currentItems.length === 0 && (
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
                            {!loading &&
                                invoiceData && currentItems?.map((item, index) => {
                                    return (
                                        <tr className="border-b border-gray-200 bg-white" key={index} >
                                            <td className="px-5 py-3 text-lg">
                                                <div className="flex items-center">
                                                    {/*<div className="flex-shrink-0 w-10 h-10">
                                        <img
                                          className="w-full h-full rounded-full"
                                          src={item?.profilePic}
                                          alt={item?.name}
                                        />
                              </div>*/}
                                                    {/*                              <div className="ml-3">
                                      <p className="text-blue-900 whitespace-no-wrap">
                                        #5036
                                      </p>
                            </div>*/}

                                                    <div className="ml-3">
                                                        <p className="text-blue-900 whitespace-no-wrap">
                                                            {item?.customer_name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            {/*<td className="px-5 py-3 text-lg">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item?.name}
                                  </p>
                          </td>*/}
                                            <td className="px-5 py-3 text-lg text-center">
                                                <p className="text-gray-900 whitespace-no-wrap">${(item?.amount) / 100}</p>
                                            </td>
                                            <td className="px-5 py-3 text-lg text-center">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {mockComponent(
                                                        item?.startDate
                                                    ).format("LLL")}

                                                </p>
                                            </td>
                                            <td className="px-5 py-3 text-lg text-center">
                                                {item.status === "paid" ? (
                                                    <span className="bg-[#3AB700] rounded-full px-6 py-1 text-white hover:bg-primary text-sm">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="bg-[#FF0000] rounded-full px-6 py-1 text-white hover:bg-primary text-sm">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3 text-lg text-center">
                                                <div className="flex gap-4 justify-center">
                                                    <>
                                                        <div
                                                            data-tip
                                                            data-for="View"
                                                            className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xl p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                            onClick={() => { setShowInvoice(true); setInvoiceId(item?.invoiceID) }}
                                                        >
                                                            <BsEyeFill />
                                                        </div>

                                                        <div
                                                            data-tip
                                                            data-for="Download"
                                                            className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                            onClick={() => { DownloadInvoice(); setInvoiceId(item?.id); }}
                                                        >
                                                            <FaDownload />
                                                        </div>
                                                    </>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            {!loading &&
                                invoiceData &&
                                invoiceData?.length === 0 && (
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
                    {invoiceData?.length > 0 && (
                        <div className="flex my-3 items-center border float-right h-12 lg:mr-20 md:mr-16 sm:mr-8 text-gray-500 rounded-lg bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            {Array.from({ length: Math.ceil(invoiceData?.length / pageSize) }, (_, index) => (
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
            </>
        )}
            {
                showInvoice && (
                    <div className="p-4 flex justify-start items-center gap-2">
                        <IoIosArrowRoundBack
                            size={36}
                            className="cursor-pointer"
                            onClick={() => setShowInvoice(false)}
                        />
                        <h1 className="font-medium lg:text-2xl md:text-2xl sm:text-xl">
                            Invoice
                        </h1>
                    </div>
                )
            }
            <div className={`${showInvoice ? "" : "hidden"}`}>
                <InvoiceBilling
                    InvoiceRef={InvoiceRef}
                    setShowInvoice={setShowInvoice}
                    selectData={selectData}
                />
            </div>
        </>
    )
}

export default Invoice
