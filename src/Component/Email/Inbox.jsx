import React, { useState } from 'react'
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import moment from 'moment';
import { useEffect } from 'react';
import { ALL_GMAIL_DETAILS_BY_ID } from '../../Pages/API';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllMailDetailsByID } from '../../Redux/EmailSlice';
import SelectedMailInbox from './SelectedMailInbox';

const Inbox = ({ InboxData, SelectedMail, setSelectedMail, totalPages, currentPage, handlePageChange, totalCount, pageSize, setPageSize }) => {

    const { user, token } = useSelector((state) => state.root.auth);
    const authToken = `Bearer ${token}`;
    const dispatch = useDispatch()
    const [selectData, setSelectData] = useState("")
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        setLoading(true)
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${ALL_GMAIL_DETAILS_BY_ID}?MailDetailsID=${SelectedMail}`,
            headers: {
                Authorization: authToken,
                "Content-Type": "application/json",
            },
        }

        dispatch(GetAllMailDetailsByID({ config })).then((res) => {
            if (res?.payload?.status) {
                setSelectData(res?.payload?.data)
            }
            setTimeout(() => {
                setLoading(false)
            }, 2000);
        }).catch((err) => {
            console.log('err', err)
            setLoading(false)
        })
    }

    useEffect(() => {
        if (SelectedMail !== "") {
            fetchData()
        }
    }, [SelectedMail])

    return (
        <>
            {SelectedMail === "" && (
                <div class="flex h-full flex-col w-full">
                    <div class="h-full">
                        <table class="h-full w-full table-auto">
                            <thead>
                                <tr class="flex border-y border-stroke dark:border-strokedark">
                                    <th class="w-[65%] py-6 pl-4 pr-4 lg:pl-10 xl:w-1/4">
                                        <label for="checkbox-1" class="flex cursor-pointer select-none items-center font-medium">
                                            {/* <div class="relative">
                                                <input type="checkbox" id="checkbox-1" class="tableCheckbox sr-only" />
                                                <div
                                                    class="box mr-4 flex h-5 w-5 items-center justify-center rounded-[3px] border-[.5px] border-stroke bg-gray-2 text-white dark:border-strokedark dark:bg-boxdark-2">
                                                    <span class="opacity-0">
                                                        <svg width="14" height="14" viewBox="0 0 10 10">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M8.62796 2.20602C8.79068 2.36874 8.79068 2.63256 8.62796 2.79528L4.04463 7.37861C3.88191 7.54133 3.61809 7.54133 3.45537 7.37861L1.37204 5.29528C1.20932 5.13256 1.20932 4.86874 1.37204 4.70602C1.53476 4.5433 1.79858 4.5433 1.96129 4.70602L3.75 6.49473L8.03871 2.20602C8.20142 2.0433 8.46524 2.0433 8.62796 2.20602Z"
                                                                fill="currentColor"></path>
                                                        </svg>
                                                    </span>
                                                </div>
            </div>*/}
                                            Sender
                                        </label>
                                    </th>
                                    <th class="hidden w-3/5 px-4 py-6 xl:block">
                                        <p class="text-left font-medium">Subject</p>
                                    </th>
                                    <th class="w-[35%] py-6 pl-4 pr-4 lg:pr-10 xl:w-[20%]">
                                        <p class="text-right font-medium">Date</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="block h-full max-h-full overflow-auto py-4">
                                {InboxData?.map((item) => {
                                    return (
                                        <tr class="flex cursor-pointer items-center hover:bg-whiten dark:hover:bg-boxdark-2 hover:bg-primary/5" key={item?.mailDetailsID} onClick={() => setSelectedMail(item?.mailDetailsID)}>
                                            <td class="w-[65%] py-4 pl-4 pr-4 lg:pl-10 xl:w-1/4">
                                                <label for="checkbox-2"
                                                    class="flex cursor-pointer select-none items-center text-sm font-medium sm:text-base">
                                                    {/*<div class="relative">
                                                        <input type="checkbox" id="checkbox-2" class="tableCheckbox sr-only" />
                                                        <div
                                                            class="box mr-4 flex h-5 w-5 items-center justify-center rounded-[3px] border-[.5px] border-stroke bg-gray-2 text-white dark:border-strokedark dark:bg-boxdark-2">
                                                            <span class="opacity-0">
                                                                <svg width="14" height="14" viewBox="0 0 10 10">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                                        d="M8.62796 2.20602C8.79068 2.36874 8.79068 2.63256 8.62796 2.79528L4.04463 7.37861C3.88191 7.54133 3.61809 7.54133 3.45537 7.37861L1.37204 5.29528C1.20932 5.13256 1.20932 4.86874 1.37204 4.70602C1.53476 4.5433 1.79858 4.5433 1.96129 4.70602L3.75 6.49473L8.03871 2.20602C8.20142 2.0433 8.46524 2.0433 8.62796 2.20602Z"
                                                                        fill="currentColor"></path>
                                                                </svg>
                                                            </span>
                                                        </div>
                                    </div>*/}
                                                    {/*<span class="pr-3">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M11.1034 3.81714C11.4703 3.07397 12.53 3.07397 12.8968 3.81714L14.8577 7.7896C15.0032 8.08445 15.2844 8.28891 15.6098 8.33646L19.9964 8.97763C20.8163 9.09747 21.1431 10.1053 20.5495 10.6835L17.3769 13.7735C17.1411 14.0033 17.0334 14.3344 17.0891 14.6589L17.8376 19.0231C17.9777 19.8401 17.1201 20.4631 16.3865 20.0773L12.4656 18.0153C12.1742 17.8621 11.8261 17.8621 11.5347 18.0153L7.61377 20.0773C6.88014 20.4631 6.02259 19.8401 6.16271 19.0231L6.91122 14.6589C6.96689 14.3344 6.85922 14.0033 6.62335 13.7735L3.45082 10.6835C2.85722 10.1053 3.18401 9.09747 4.00392 8.97763L8.39051 8.33646C8.71586 8.28891 8.99704 8.08445 9.14258 7.7896L11.1034 3.81714Z"
                                                                fill={`${item?.important ? "#FFD02C" : "#E5E7EE"}`}></path>
                                                        </svg>
                                </span>*/}
                                                    {item?.senderName}
                                                </label>
                                            </td>
                                            <td class="hidden w-3/5 p-4 xl:block">
                                                <p>
                                                    {item?.subject}

                                                </p>
                                            </td>
                                            <td class="w-[35%] py-4 pl-4 pr-4 lg:pr-10 xl:w-[20%]">
                                                <p class="text-right text-xs xl:text-base">
                                                    {moment(item?.sendDateTime).format('DD MMMM, YYYY')}
                                                </p>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {InboxData?.length === 0 && (
                                    <div className="flex text-center h-full items-center m-5 justify-center">
                                        <span className="text-2xl font-semibold py-2 px-4 rounded-full me-2 text-black">
                                            No Data Available
                                        </span>
                                    </div>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div
                        class="flex items-center justify-between border-t border-stroke p-4 dark:border-strokedark sm:px-6">
                        <p class="text-base font-medium text-black dark:text-white md:text-lg">
                            {currentPage} - {totalPages} of {totalCount}
                        </p>
                        <div class="flex items-center justify-end space-x-3">
                            <select className='p-2 border border-gray rounded-lg' value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                            <button
                                class="flex h-7.5 w-7.5 items-center cursor-pointer p-1 justify-center rounded border border-stroke bg-whiten hover:border-primary hover:bg-primary hover:text-white"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <GrFormPreviousLink size={26} />
                            </button>
                            <button
                                class="flex h-7.5 w-7.5 items-center cursor-pointer p-1 justify-center rounded border border-stroke bg-whiten hover:border-primary hover:bg-primary hover:text-white"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={(currentPage === totalPages) || (InboxData?.length === 0)}
                            >
                                <GrFormNextLink size={26} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {!loading && SelectedMail && (
                <SelectedMailInbox selectData={selectData} setSelectedMail={setSelectedMail} />
            )}

            {loading && SelectedMail && (
                <div className="flex justify-center p-5 w-full items-center">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
        </>
    )
}

export default Inbox
