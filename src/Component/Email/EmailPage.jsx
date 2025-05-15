import React, { useState } from 'react'
import PropTypes from "prop-types";
import { FaPlus } from 'react-icons/fa';
import SendMail from './SendMail';
import Inbox from './Inbox';
import { useEffect } from 'react';
import { ALL_GMAIL_DETAILS, GET_ALL_CATEGORY } from '../../Pages/API';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllCategory, handleGetEmailInbox } from '../../Redux/EmailSlice';
import { capitalizeFirstLetter, createMarkup } from '../Common/Common';
import Footer from '../Footer';

const EmailPage = ({ sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar, loading, setLoading }) => {
    EmailPage.propTypes = {
        sidebarOpen: PropTypes.bool.isRequired,
        setSidebarOpen: PropTypes.func.isRequired,
        mobileSidebar: PropTypes.bool.isRequired,
        setMobileSidebar: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        setLoading: PropTypes.func.isRequired,
    };
    const { token } = useSelector((state) => state.root.auth);
    const authToken = `Bearer ${token}`;
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState(1)
    const [sendMail, setSendMail] = useState(false)
    const [allCategory, setAllCategory] = useState([])
    const [loader, setLoader] = useState(true);
    const [InboxData, setInboxData] = useState([])
    const [SelectedMail, setSelectedMail] = useState("")
    const [totalCount, setTotalCount] = useState()


    // Pagination    
    const [pageSize, setPageSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalCount / pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const toggleModal = () => {
        setSendMail(!sendMail)
    }

    const fetchCategory = () => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: GET_ALL_CATEGORY,
            headers: {
                Authorization: authToken,
                "Content-Type": "application/json",
            },
        }

        dispatch(GetAllCategory({ config })).then((res) => {
            if (res?.payload?.status) {
                setAllCategory(res?.payload?.data)
            }
            setLoading(false)
        }).catch((err) => {
            console.log('err', err)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const fetchData = () => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${ALL_GMAIL_DETAILS}?GmailCategoryID=${activeTab}&PageNo=${currentPage}&limit=${pageSize}`,
            headers: {
                Authorization: authToken,
                "Content-Type": "application/json",
            },
        }

        dispatch(handleGetEmailInbox({ config })).then((res) => {
            if (res?.payload?.status) {
                setInboxData(res?.payload?.data?.[0])
                setTotalCount(res?.payload?.data?.[1]?.totalRow)
            } else {
                setInboxData([])
                setTotalCount(0)
                setCurrentPage(1)
            }
            setLoader(false)
        }).catch((err) => {
            console.log('err', err)
            setLoader(false)
        })
    }

    useEffect(() => {
        fetchData()
    }, [activeTab, currentPage, pageSize])


    return (
        <>
            {!loading && (
                <main class="bg-white-medium flex-1 p-5 overflow-hidden">
                    <div class="flex flex-col">
                        <section className="flex justify-between items-center flex-1 flex-col md:flex-row lg:flex-row mx-2 pb-5">
                            <h1 className="font-bold text-xl">Email</h1>
                            <button
                                class="  rounded-md bg-primary px-3.5 pb-2 py-1 font-medium text-white items-center "
                            // onClick={() => { setSendMail(true) }}
                            >
                                LOGOUT
                            </button>
                        </section>

                        <div class="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
                            <div
                                class="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex">
                                <div
                                    class="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark w-[300px]">
                                    {/*<button
                                        class="absolute -right-20 z-99999 block rounded-md border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
                                    >
                                        <svg class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                            <path
                                                d="M 22.1875 2.28125 L 20.78125 3.71875 L 25.0625 8 L 4 8 L 4 10 L 25.0625 10 L 20.78125 14.28125 L 22.1875 15.71875 L 28.90625 9 Z M 9.8125 16.28125 L 3.09375 23 L 9.8125 29.71875 L 11.21875 28.28125 L 6.9375 24 L 28 24 L 28 22 L 6.9375 22 L 11.21875 17.71875 Z">
                                            </path>
                                        </svg>
            </button>*/}
                                    <div class="px-4 pt-4">
                                        <button
                                            class="flex w-full rounded-md bg-primary px-3.5 py-2.5 font-medium text-white items-center gap-2"
                                            onClick={() => {
                                                setSendMail(true)
                                            }}>
                                            <FaPlus />
                                            <span>
                                                Compose
                                            </span>
                                        </button>
                                    </div>
                                    <div class="no-scrollbar max-h-full overflow-auto py-6">
                                        <ul class="flex flex-col gap-2" x-data="{ isActive: 'inbox' }">
                                            {allCategory?.length > 0 && !loading && allCategory?.map((item) => {
                                                return (
                                                    <li onClick={() => { setActiveTab(item?.gmailCategoryID); setSelectedMail(""); setCurrentPage(1); setPageSize(20) }}>
                                                        <a
                                                            class={`${activeTab === item?.gmailCategoryID ? "bg-primary/5 before:!h-full" : ""} relative flex items-center gap-2.5 cursor-pointer px-5 py-2.5 font-medium duration-300 ease-linear before:absolute before:left-0 before:h-0 before:w-1 before:bg-primary before:duration-300 before:ease-linear hover:bg-primary/5 hover:text-primary hover:before:h-full `}
                                                        >
                                                            <span dangerouslySetInnerHTML={createMarkup(item.icon)} className='svg-icons' />
                                                            {capitalizeFirstLetter(item?.name)}
                                                        </a>
                                                    </li>
                                                )
                                            })}

                                        </ul>
                                    </div>

                                </div>
                                {!loader && !loading && (
                                    <Inbox InboxData={InboxData} setSelectedMail={setSelectedMail} SelectedMail={SelectedMail} totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} totalCount={totalCount} setPageSize={setPageSize} pageSize={pageSize} />
                                )}
                                {loader && (
                                    <div className="flex justify-center p-5 w-full items-center">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </main>
            )}
            {sendMail && (
                <SendMail toggleModal={toggleModal} />
            )}

        </>
    )
}

export default EmailPage
