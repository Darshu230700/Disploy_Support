import moment from 'moment'
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { IoPersonCircleSharp } from 'react-icons/io5'

const SelectedMailInbox = ({ selectData, setSelectedMail }) => {
    return (
        <>
            <div className='p-4 h-full w-full'>
                <div className='flex flex-col gap-2 h-full w-full'>
                    <div className='border-b border-gray flex flex-row items-center pb-2'>
                        <div className='cursor-pointer'>
                            <IoMdArrowRoundBack size={26} onClick={() => setSelectedMail("")} />
                        </div>
                        <div className='text-xl font-semibold pl-5'>
                            {selectData?.subject}
                        </div>
                    </div>
                    <div className='w-full h-full gap-2 '>
                        <div className='flex flex-row h-full max-h-full'>
                            <div className='mt-2'>
                                <IoPersonCircleSharp size={36} />
                            </div>
                            <div className='w-full'>
                                <div className='w-full'>
                                    <div className='flex justify-between w-full flex-row'>
                                        <div>
                                            {selectData?.senderEmail.replace(/"/g, '')}
                                        </div>
                                        <div className='float-end flex gap-2 items-center'>
                                            <div>
                                                {moment(selectData?.sendDateTime).format('MMMM DD, YYYY, hh:mm A')}
                                            </div>
                                            {/*<span>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11.1034 3.81714C11.4703 3.07397 12.53 3.07397 12.8968 3.81714L14.8577 7.7896C15.0032 8.08445 15.2844 8.28891 15.6098 8.33646L19.9964 8.97763C20.8163 9.09747 21.1431 10.1053 20.5495 10.6835L17.3769 13.7735C17.1411 14.0033 17.0334 14.3344 17.0891 14.6589L17.8376 19.0231C17.9777 19.8401 17.1201 20.4631 16.3865 20.0773L12.4656 18.0153C12.1742 17.8621 11.8261 17.8621 11.5347 18.0153L7.61377 20.0773C6.88014 20.4631 6.02259 19.8401 6.16271 19.0231L6.91122 14.6589C6.96689 14.3344 6.85922 14.0033 6.62335 13.7735L3.45082 10.6835C2.85722 10.1053 3.18401 9.09747 4.00392 8.97763L8.39051 8.33646C8.71586 8.28891 8.99704 8.08445 9.14258 7.7896L11.1034 3.81714Z"
                                                        fill={`${selectData?.important ? "#FFD02C" : "#E5E7EE"}`}></path>
                                                </svg>
    </span>*/}
                                        </div>
                                    </div>
                                    <div>
                                        to me
                                    </div>
                                </div>
                                <div className='w-full h-full'>
                                    <div className=' w-full h-full p-4 overflow-auto'>
                                        <div className='w-full h-full' dangerouslySetInnerHTML={{ __html: selectData?.body }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectedMailInbox
